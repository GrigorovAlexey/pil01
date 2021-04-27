const User = require('./models/user')
const Role = require('./models/role')
const bcrypt = require('bcryptjs')
const {validationResult} = require("express-validator")//пишет какие именно ошибки валидации(валидация проверяется до того как попадает в функцию)
const {secret} = require('./config')
const jwt = require('jsonwebtoken')
//мидлвеир звено между функцией и запросом

// const generateAccessToken = (id, name) => {
//     const payload = {
//         id,
//         name
//     }
//     return jwt.sign(payload, secret, {expiresIn: "24h"} )
// }

//1Admin!
class authController{
    async registration(req, res){
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "registration error", errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if(candidate) {
                return res.status(400).json({message: "A user with this name already exists"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);//7 - уровень хэширования(чем выше тем дольше будет идти хэширование)
            // const userRole = await Role.findOne({value: "USER"})
            const user = new user({username: username, password: hashPassword, roles: "User"})
            await user.save()
            return res.json({message: "The user is successfully registered"})

        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Registration error"})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            // const token = generateAccessToken(user._id, user.name)

            const token = jwt.sign({_id: user._id, password: user.password}, secret)
            // response.header('auth-token',token).send(token)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res){
        try{
            // const userRole = new Role()
            // const adminRole = new Role({value: "ADMIN"})
            // await userRole.save()
            // await adminRole.save()
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()