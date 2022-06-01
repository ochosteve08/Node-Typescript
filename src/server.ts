import express from "express"
import config from 'config'
import connectDB from './utils/connect'
import logger from './utils/logger'
import routes from './routes'


const port = config.get<number>('port')

const app = express()

app.listen(port, async ()=>{
    logger.info(`App is running at localhost:${port}`)

    await connectDB();

    routes(app)
})