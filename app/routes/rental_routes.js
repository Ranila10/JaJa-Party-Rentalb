// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for rental
const Rental = require('../models/rental')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// CREATE
// POST /rentals
router.post('/rentals', requireToken, (req, res, next) => {
  // set owner of new example to be current user
  req.body.rental.owner = req.user.id

  Rental.create(req.body.rental)
    // respond to succesful `create` with status 201 and JSON of new "event"
    .then(rental => {
      res.status(201).json({ rental: rental.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// INDEX
// GET /events
router.get('/rentals', (req, res, next) => {
  Rental.find()
    .then(rentals => {
      // `rentals` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return rentals.map(rental => rental.toObject())
    })
    // respond with status 200 and JSON of the examples
    .then(rentals => res.status(200).json({ rentals: rentals }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /events/5a7db6c74d55bc51bdf39793(ID)
router.get('/rentals/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Rental.findById(req.params.id)
    .then(handle404)
    // if `findById` is successful, respond with 200 and "event" JSON
    .then(rental => res.status(200).json({ rental: rental.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// UPDATE
// PATCH /events/5a7db6c74d55bc51bdf39793
router.patch('/rentals/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  // delete req.body.event.owner

  Rental.findById(req.params.id)
    .then(handle404)
    .then(rental => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, rental)

      // pass the result of Mongoose's `.update` to the next `.then`
      return rental.updateOne(req.body.rental)
    })
    // if that succeeded, return 204 and no JSON(will show 'no content')
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /events/5a7db6c74d55bc51bdf39793
router.delete('/rentals/:id', requireToken, (req, res, next) => {
  Rental.findById(req.params.id)
    .then(handle404)
    .then(rental => {
      // throw an error if current user doesn't own `event`
      requireOwnership(req, rental)
      // delete the event ONLY IF the above didn't throw error
      rental.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
