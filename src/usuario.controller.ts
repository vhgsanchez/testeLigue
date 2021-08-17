import * as express from 'express';
import { MongoHelper } from './mongo.helper';
import * as  mongodb from 'mongodb'
import UsuarioModel from './usuarios';
import * as moment from 'moment';
const usuariosRoutes = express.Router();

usuariosRoutes.get('/developers', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
    try {
        let items: any = await UsuarioModel.find({}, '-__v')
        items = items.map((item) => {
            const newDate = moment(item.birthdate).format("DD/MM/YYYY")
            const id = item._id;
            delete item._doc._id;
            delete item._doc.birthdate;
            return { id, birthdate: newDate, ...item._doc }
        })
        resp.json(items)
    } catch (err) {

        resp.status(500);
        resp.end(); console.error('Caught an error: ', err)
    }
})
usuariosRoutes.get('/developers/filter', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
    const name = req.query.name ?? '';
    const sex = req.query.sex ?? '';
    const hobby = req.query.hobby ?? '';
    const data = req.query.birthdate;
    const birthdate = data != undefined  ? moment(data.toString(), "DD/MM/YYYY").format("YYYY/MM/DD") : null

    let filters: any = {}
    if (name) {
        filters.name = name;
    }
    if (sex) {
        filters.sex = sex;
    }
    if (hobby) {
        filters.hobby = hobby;
    }
    if (birthdate) {
        filters.birthdate = birthdate;
    }

    try {
        let items: any = await UsuarioModel.find(filters, '-__v')
        items = items.map((item) => {
            const newDate = moment(item.birthdate).format("DD/MM/YYYY")
            const id = item._id;
            delete item._doc._id;
            delete item._doc.birthdate;
            return { id, birthdate: newDate, ...item._doc }
        })
        resp.json(items)
    } catch (err) {

        resp.status(500);
        resp.end(); console.error('Caught an error: ', err)
    }
})
usuariosRoutes.get('/developers/:id', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
    const id: any = new mongodb.ObjectId(req.params.id)
    try {
        let item: any = await UsuarioModel.findById(id, '-__v')
        const newDate = moment(item.birthdate).format("DD/MM/YYYY")
        const userId = item._id;
        delete item._doc._id;
        delete item._doc.birthdate;
        item = { id: userId, birthdate: newDate, ...item._doc }
        resp.json(item)
    } catch (err) {

        resp.status(500);
        resp.end(); console.error('Caught an error: ', err)
    }
})
usuariosRoutes.post('/developers', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
    const { name, sex, age, hobby, birthdate } = req.body
    const date = moment(birthdate, "DD/MM/YYYY").format("YYYY/MM/DD")
    const item = new UsuarioModel({ name, sex, age, hobby, birthdate: date })
    await item.save();
    resp.send(item)

})
usuariosRoutes.put('/developers/:id', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
    const { name, sex, age, hobby, birthdate } = req.body
    const date = moment(birthdate, "DD/MM/YYYY").format("YYYY/MM/DD")
    const { id } = req.params
    const updated = await UsuarioModel.findByIdAndUpdate(id, { name, sex, age, hobby, birthdate: date }, { new: true })
    resp.json(updated)
})
usuariosRoutes.delete('/developers/:id', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
    const { id } = req.params

    await UsuarioModel.findByIdAndRemove(id);
    resp.status(200).end("Success")
})
export { usuariosRoutes }