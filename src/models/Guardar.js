import mongoose from "mongoose";

const Experiencia = new mongoose.Schema({
    cargo: String,
    empresa: String,
    fecha: String,
    ubicacion: String,
})
const Educacion = new mongoose.Schema({
    institucion: String, 
    titulo: String,
    fecha: String
})

const Guardar = mongoose.model('Guardar', DataSchema) 

export default Guardar