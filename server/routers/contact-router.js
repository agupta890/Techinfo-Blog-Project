const express = require('express')
const { contact, getAllMessage } = require('../controllers/contact-controller')
const router = express.Router()


router.route('/contact').post(contact)
router.route('/message').get(getAllMessage)

module.exports = router