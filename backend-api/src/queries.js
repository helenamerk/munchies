import 'dotenv/config';

import * as Pool from 'pg';

const pool = new Pool.Pool({
  user: `${process.env.USER}`,
  host: `${process.env.HOST}`,
  database: `${process.env.DATABASE}`,
  password: `${process.env.PASSWORD}`,
  port: `${process.env.PG_PORT}`,
});

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
  const { user } = request.body
  console.log(user.name)
  console.log(user.email)

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING ID', [user.name, user.email], (error, results) => {
    if (error) {
      console.log(error)
      console.log('not allowed')
      throw error
    }
    console.log('HERE')
    console.log(results)
    console.log(results.rows[0].id)
    console.log('---------')
    response.status(201).json({ user_id: results.rows[0].id});
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

  pool.query('SELECT * FROM relationships', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Alert Handlings

const registerDeviceToken = (req, res) => {
    let push_token = req.body.token.value
    let user_id = req.body.user_id.value
    console.log(push_token)
    pool.query('INSERT INTO registered_devices (user_id, push_token) VALUES ($1, $2) RETURNING ID', [user_id, push_token], (error, results) => {
      if (error) {
        throw error
      }
      console.log('HERE')
      console.log(results)
      console.log(results.rows[0].id)
      console.log('---------')
      res.status(201).send(`Device token added with ID: ${results.rows[0].id}`)
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
  registerDeviceToken,
}
