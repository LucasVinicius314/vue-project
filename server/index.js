require('dotenv').config()
const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()

const { log } = console

const connection = () => {
  const temp = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    //timezone: '-2:00',
  })
  temp.connect()
  temp.on('error', log)
  return temp
}

const query = async (_query, _arr) => await new Promise((resolve, reject) => {
  const con = connection()
  con.query(_query, _arr, (error, results, fields) =>
    log(results) || error
      ? reject(error)
      : resolve(true))
  con.end()
})

const queryOne = async (_query, _arr) => await new Promise((resolve, reject) => {
  const con = connection()
  con.query(_query, _arr, (error, results, fields) =>
    log(results) || error
      ? reject(error)
      : results.length !== 1
        ? reject(results)
        : resolve(results[0]))
  con.end()
})

const queryAll = async (_query, _arr) => await new Promise((resolve, reject) => {
  const con = connection()
  con.query(_query, _arr, (error, results, fields) =>
    log(results) || error
      ? reject(error)
      : resolve(results))
  con.end()
})

const verifyJWT = (req, res, next) => {
  const token = req.headers['token']
  if (!token) return res.status(401).json({ message: 'No token provided' })
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Failed to authenticate token' })
    req.user = decoded
    next()
  })
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', (req, res, next) => {
  log('/')
  res.contentType('application/json')
  next()
})

app.post('/api/class/all', (req, res) => {
  log('api/class/all')
  log('body', req.body)
  const { name } = req.body
  queryAll(`select * from class where ${name !== undefined && name.length !== 0 ? `name like \'%${name}%\'` : '1'}`)
    .then(d => res.status(200).json({ data: d }))
    .catch(e => log(e) || res.status(400).json({ message: e }))
})

app.get('/api/class/delete/:id', (req, res) => {
  log('api/class/delete/id')
  log('params', req.params)
  const { id } = req.params
  queryAll('delete from class where id = ?', [id])
    .then(d => res.status(200).json({ message: 'Deleted' }))
    .catch(e => log(e) || res.status(400).json({ message: e, params: req.params }))
})

app.post('/api/class/create', (req, res) => {
  log('api/class/create')
  log('body', req.body)
  const { name, description, user_id } = req.body

  try {
    if (name.length === 0) throw 'Invalid name'
  } catch (e) {
    return res.status(400).json({ message: e, body: req.body })
  }

  queryAll('insert into class (name, description, user_id) values (?, ?, ?)', [name, description, user_id])
    .then(d => res.status(200).json({ message: 'Created' }))
    .catch(e => log(e) || res.status(400).json({ message: e, body: req.body }))
})

app.listen(process.env.PORT, () => log(`listening on port ${process.env.PORT}`))
