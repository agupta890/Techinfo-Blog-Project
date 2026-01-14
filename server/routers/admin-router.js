const express = require('express')
const router = express.Router()
const isAdmin = require('../middleware/admin-middleware')
const isAuth = require('../middleware/auth-middleware')
const {getAllUser,deleteUsers} = require('../controllers/Admin-controller')

router.route('/users').get(isAuth,isAdmin,getAllUser)
router.route('/users/:id').delete(isAuth,isAdmin,deleteUsers)

module.exports = router