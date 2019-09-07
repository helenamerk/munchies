import 'dotenv/config';
import * as Pool from 'pg';

const pool = new Pool.Pool({
  user: `${process.env.USER}`,
  host: `${process.env.HOST}`,
  database: `${process.env.DATABASE}`,
  password: `${process.env.PASSWORD}`,
  port: `${process.env.PG_PORT}`,
})

// eventaully move config details to a seperate file with restrictive permission

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}


const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const getUserFriends = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM relationships WHERE user_one = $1 OR user_two = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getFriends = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM relationships', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers,
  getUserById,
  getFriends,
  getUserFriends,
  createUser,
  updateUser,
  deleteUser,
}
