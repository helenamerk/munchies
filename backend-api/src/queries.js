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

const getMunchById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM munch_groups WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getMunchMembers = (request, response) => {
  const id = parseInt(request.params.id)
  console.log('HELP')
  console.log(id)

  pool.query('SELECT user_id FROM users_in_groups WHERE group_id = $1', [id], (error, results) => {
    console.log(results.rows)
    if (error) {
      console.log(error)
      throw error
    }
    let newres = []
    for (let i in results.rows) {
      newres[i] = Object.values(results.rows[i])[0]
    }
    response.status(200).json({data: newres})
  })
}

const createUser = (request, response) => {
  const { user } = request.body
  console.log(user.name)
  console.log(user.email)

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING ID', [user.name, user.email], (error, results) => {
    if (error) {
      console.log(error)
      throw error
    }
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

const addToMunch = (group_id, user_id, creator) => {
  console.log(group_id, user_id, creator)
  return pool.query('INSERT INTO users_in_groups (group_id, user_id, creator) VALUES ($1, $2, $3) RETURNING user_id', [group_id, user_id, creator], (error, results) => {
    console.log('HERE?')
    console.log(results)
    if (error) {
      console.log(error)
    }
    return results
  })
}

const joinMunch = (req, res) => {
  const { munch_id, user_id } = req.body
  addToMunch(munch_id, user_id, false)
  res.status(201).send(`successfully joined group`);
}

const scheduleMunch = (req, res) => {
  const { timestamp, venue_id, owner } = req.body

  console.log(timestamp)
  console.log(venue_id)
  console.log(owner)

  pool.query('INSERT INTO munch_groups (scheduled_time, venue_id) VALUES ($1, $2) RETURNING ID', [timestamp, venue_id], (error, results) => {
    if (error) {
      console.log(error)
      throw error
    }
    console.log(results.rows[0].id)
    addToMunch(results.rows[0].id, owner, true);
    res.status(201).json({ munch_id: results.rows[0].id});
  });
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



// Venues

const getVenueById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM venues WHERE id = 1', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers,
  getUserById,
  getMunchById,
  getFriends,
  getUserFriends,
  createUser,
  updateUser,
  deleteUser,
  getVenueById,
  joinMunch,
  getMunchMembers,
  scheduleMunch,
  registerDeviceToken,
}
