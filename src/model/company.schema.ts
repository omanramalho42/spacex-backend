import mongoose from'mongoose';

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  founder: { type: String, required: true },
  founded: { type: Number, required: true },
  employees: { type: Number, required: true },
  vehicles: { type: Number, required: true },
  launch_sites: { type: Number, required: true },
  test_sites: { type: Number, required: true },
  ceo: { type: String, required: true },
  cto: { type: String, required: true },
  coo: { type: String, required: true },
  cto_propulsion: { type: String, required: true },
  valuation: { type: Number, required: true },
  headquarters: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true }
  },
  links: {
    website: { type: String, required: true },
    flickr: { type: String, required: true },
    twitter: { type: String, required: true },
    elon_twitter: { type: String, required: true }
  },
  summary: { type: String, required: true }
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
