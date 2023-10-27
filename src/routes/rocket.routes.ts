import { FastifyInstance } from 'fastify'
const RocketController = require('../controllers/rocket.controller')

async function routes(fastify: FastifyInstance, options) {
  fastify.get("/", RocketController.getAllRockets);
  fastify.get("/:id", RocketController.findRocket);
}

module.exports = routes
