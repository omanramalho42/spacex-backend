import { FastifyInstance } from 'fastify'
const HomeController = require('../controllers/home.controller')

async function routes(fastify: FastifyInstance, options) {
  fastify.get("/", HomeController.welcome);
}

module.exports = routes
