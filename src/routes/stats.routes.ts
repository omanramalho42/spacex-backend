import { FastifyInstance } from 'fastify'
const StatsController = require('../controllers/stats.controller')

async function routes(fastify: FastifyInstance, options) {
  fastify.get("/bar", StatsController.getBarStats);
  fastify.get("/pie", StatsController.getPieStats);
}

module.exports = routes
