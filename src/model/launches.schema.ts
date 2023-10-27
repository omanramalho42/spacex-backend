import mongoose, { Schema } from 'mongoose'

const launchesSchema = new mongoose.Schema({
  flight_number: { type: Number, required: true },
  mission_name: { type: String, required: true },
  mission_id: [String],
  upcoming: { type: Boolean, required: true },
  launch_year: { type: String, required: true },
  launch_date_unix: { type: Number, required: true },
  launch_date_utc: { type: Date, required: true },
  launch_date_local: { type: Date, required: true },
  is_tentative: { type: Boolean, required: true },
  tentative_max_precision: { type: String, required: true },
  tbd: { type: Boolean, required: true },
  launch_window: { type: Number, default: 0 }, // Definindo um valor padrão para launch_window
  // Referência para o esquema Rocket
  rocket: { type: Schema.Types.ObjectId, ref: 'Rocket' },
  ships: [String],
  telemetry: { flight_club: String },
  launch_site: {
    site_id: { type: String, required: true },
    site_name: { type: String, required: true },
    site_name_long: { type: String, required: true }
  },
  launch_success: { type: Boolean },
  launch_failure_details: {
    time: { type: Number },
    altitude: { type: Number },
    reason: { type: String }
  },
  links: {
    mission_patch: { type: String },
    mission_patch_small: { type: String },
    reddit_campaign: { type: String },
    reddit_launch: { type: String },
    reddit_recovery: { type: String },
    reddit_media: { type: String },
    presskit: { type: String },
    article_link: { type: String },
    wikipedia: { type: String },
    video_link: { type: String },
    youtube_id: { type: String },
    flickr_images: [String]
  },
  details: { type: String },
  static_fire_date_utc: { type: Date },
  static_fire_date_unix: { type: Number },
  timeline: { webcast_liftoff: { type: Number } },
  crew: { type: [String] }, 
});

const Launches = mongoose.model('Launches', launchesSchema);

module.exports = Launches;
