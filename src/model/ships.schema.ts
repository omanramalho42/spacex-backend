import mongoose from 'mongoose';

const shipsSchema = new mongoose.Schema({
  ship_id: { type: String, required: true },
  ship_name: { type: String, required: true },
  ship_model: String,
  ship_type: { type: String, required: true },
  roles: [String],
  active: { type: Boolean, required: true },
  imo: Number,
  mmsi: Number,
  abs: Number,
  class: Number,
  weight_lbs: Number,
  weight_kg: Number,
  year_built: Number,
  home_port: { type: String, required: true },
  status: String,
  speed_kn: Number,
  course_deg: Number,
  position: {
    latitude: Number,
    longitude: Number
  },
  successful_landings: Number,
  attempted_landings: Number,
  attempted_catches: Number,
  successful_catches: Number,
  missions: [{
    name: { type: String, required: true },
    flight: { type: Number, required: true }
  }],
  url: { type: String, required: true },
  image: { type: String, required: true }
});

const Ships = mongoose.model('Ships', shipsSchema);

module.exports = Ships;