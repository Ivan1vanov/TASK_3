import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
import config from 'config'
import cors from 'cors'
import { routes } from './routes/routes';

const app = express()

dotenv.config({path: __dirname+'/.env'})


app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.get('/', (req: Request, res: Response) => {
    res.send('hello')
})

const PORT = process.env.PORT || 5000
mongoose.connect(config.get('dbUrl')).then(() => {
    app.listen(PORT, () => console.log(`server on http://localhost:${PORT}`))
    routes(app)
}).catch((e) => console.log(e))



