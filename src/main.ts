import { app } from './app';
import * as http from 'http'
import * as mongoose from 'mongoose'
require('dotenv').config({ path: '.env' })
// const mongoose = require('mongoose')

const PORT = process.env.PORT ?? '8080'
const server = http.createServer(app)
server.listen(PORT)
server.on('listening', async () => {
    console.log('Listening to port ' + PORT);
    try {
        // await MongoHelper.connect(MONGO_URI)
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        mongoose.connection.on('open', () => {
            console.info('Connected to Mongo')
        })
        mongoose.connection.on('error', (err: any) => {
            console.error(err)
        })

    } catch (err) {
        console.error(err)
    }
})