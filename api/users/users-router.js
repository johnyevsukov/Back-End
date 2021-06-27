const router = require('express').Router()
const User = require('./users-model')
const { restrict } = require('../auth/auth-middleware')

router.use(restrict)

router.get('/', (req, res, next) => {
    User.getAll()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
    if(req.decodedToken.subject == req.params.id) {
        User.deleteById(req.params.id)
        .then(() => {
            res.status(200).json('user deleted')
        })
        .catch(next)
    }
    else {
        next({
            status: 403,
            message: 'you may delete only your account'
        })
    }
})

router.get('/:id', (req, res, next) => {
    User.getById(req.params.id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(next)
})

router.get('/:id/following', (req, res, next) => {
    User.getFollowingById(req.params.id)
    .then(following => {
        res.status(200).json(following)
    })
    .catch(next)
})

router.get('/:id/followers', (req, res, next) => {
    User.getFollowersById(req.params.id)
    .then(followers => {
        res.status(200).json(followers)
    })
    .catch(next)
})

module.exports = router
