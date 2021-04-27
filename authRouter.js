const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require("express-validator")//проверка по длине(или пустое ли)
const authMiddleware = require('./middlewaree/authMiddleware')
const roleMiddleware = require('./middlewaree/roleMiddleware')

router.post('/registration',     [
    check('username', "The user name cannot be empty").notEmpty(),
    // check('password', "The password must be greater than 6 and less than 20 characters").isLength({min:6, max:20})
    check('password', "The password must be at least 6 characters, have a special character, a capital letter and a number").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/, "i")

],  controller.registration)
router.post('/login', controller.login)
router.get('/users',authMiddleware, controller.getUsers)

module.exports = router

//router - слушает запросы такие как гет делит пост..
