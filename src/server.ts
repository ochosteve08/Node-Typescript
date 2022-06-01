import express from "express"
import config from 'config'
import connectDB from './utils/connect'

const port = config.get<number>('port')

const app = express()

app.listen(port, async ()=>{
    console.log('App is running')

    await connectDB();
})