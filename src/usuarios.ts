import * as mongoose from 'mongoose'

const UsuarioSchema = new mongoose.Schema({
    name: String,
    sex: String,
    age: Number,
    hobby: String,
    birthdate:  { type: Date, default: new Date },

});

export default (mongoose.connection && mongoose.connection.models['Usuario'] ?
    mongoose.connection.models['Usuario'] :
    mongoose.model('Usuario', UsuarioSchema))