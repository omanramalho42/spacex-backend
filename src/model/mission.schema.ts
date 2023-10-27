const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  mission_name: { type: String, required: true },
  mission_id: { type: String, required: true },
  manufacturers: { type: [String], required: true },
  payload_ids: { type: [String], required: true },
  wikipedia: { type: String, required: true },
  website: { type: String, required: true },
  twitter: { type: String, required: true },
  description: { type: String, required: true }
});

const Mission = mongoose.model('Mission', missionSchema);

module.exports = Mission;
