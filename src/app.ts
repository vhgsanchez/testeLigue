import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser';
import { requestLoggerMiddleware } from './request.logger.moddleware';
import { assert } from 'node:console';
import { usuariosRoutes } from './usuario.controller';
const app = express();
app.use(requestLoggerMiddleware)
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(usuariosRoutes)

// app.use(bodyParser.json());
export { app }