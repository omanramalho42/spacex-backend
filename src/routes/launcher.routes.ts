import { FastifyInstance } from 'fastify'
const LauncherController = require('../controllers/launcher.controller')

async function routes(fastify: FastifyInstance, options) {
  fastify.get("/", LauncherController.getAllLaunchers);
  fastify.get("/:id", LauncherController.findLauncher);
}

module.exports = routes
