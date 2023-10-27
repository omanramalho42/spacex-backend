import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Definindo o esquema Rocket
const rocketSchema = new Schema({
  rocket_id: { type: String, required: true },
  rocket_name: { type: String, required: true },
  rocket_type: { type: String, required: true },
  first_stage: { cores: [mongoose.Schema.Types.Mixed] },
  second_stage: { block: { type: Number }, payloads: [mongoose.Schema.Types.Mixed] },
  fairings: {
    reused: { type: Boolean, default: false },
    recovery_attempt: { type: Boolean, default: false },
    recovered: { type: Boolean, default: false },
    ship: { type: String, default: null }
  }
});

// Criando o modelo Rocket
const Rocket = mongoose.model('Rocket', rocketSchema);


module.exports = Rocket;
