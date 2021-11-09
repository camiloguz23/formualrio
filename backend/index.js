import express from 'express'
import routes from './routes.js'
import cors from 'cors'

const app = express()


app.set("port", process.env.PORT || 9005)

app.use(express.json())
app.use("/",routes)
app.use(cors())

app.listen(app.get("port"),() => {
    console.log(`Puerto funciona ${app.get("port")}`)
})

