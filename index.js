const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use("/auth", authRouter)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://pil:pilip1984@cluster0.rswdi.mongodb.net/auth_roles`)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

// pilip1984 pil
//app.use("/auth", authRouter)//чтоб роутер слушался, auth - url (указатель ресурса)