import mongoose from 'mongoose';

const historicalSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  event_date_utc: { type: Date, required: true },
  event_date_unix: { type: Number, required: true },
  flight_number: { type: Number, default: null },
  details: { type: String, required: true },
  links: {
    reddit: { type: String, default: null },
    article: { type: String, required: true },
    wikipedia: { type: String, required: true }
  }
});

const Historical = mongoose.model('Historical', historicalSchema);

module.exports = Historical;
