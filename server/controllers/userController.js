const { User, Photo } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { getToken } = require('../helpers/jwt')
const jwt = require('jsonwebtoken')
class UserController {

  static login(req, res, next) {
    const { email, password } = req.body

    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          throw { error: 'Invalid email or password' }
        }
        const compared = comparePass(password, user.password)
        if (!compared) {
          throw { error: 'Invalid email or password' }
        }

        const token = getToken({
          id: user.id,
          email: user.email
        })
        const output = {
          id: user.id,
          email: user.email,
          access_token: token
        }

        res.status(200).json(output)
      })
      .catch(err => {
        console.log(err)
        res.status(401).json(err)
      })

  }
  static register(req, res, next) {

    const { email, password } = req.body
    const newUser = { email, password }

    User.create(newUser)
      .then(user => {
        res.status(201).json({
          id: user.id,
          email: user.email
        })
      })
      .catch(err => {
        res.status(500).json(err)
      })


  }
  static getPhotos(req, res, next) {
    console.log(req.headers.access_token, "==============================");
    const currentUser = jwt.verify(req.headers.access_token, process.env.SECRET)
    req.currentUser = currentUser

    Photo.findAll({
      where: {
        UserId: req.currentUser.id
      }
    })
      .then(photos => {
        res.status(200).json(photos)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}


module.exports = UserController

module.exports = UserController