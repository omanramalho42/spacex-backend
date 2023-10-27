import { FastifyInstance } from 'fastify'
const UserController = require('../controllers/user.controller')

const opts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        someKey: { type: 'string' },
        someOtherKey: { type: 'number' }
      }
    }
  }
}

async function routes(fastify: FastifyInstance, options) {
  fastify.post("/", opts, UserController.createUser);
  fastify.get("/",  UserController.getAllUsers);
  fastify.put("/:id",  UserController.updateUser);
  fastify.delete("/:id",  UserController.deleteUser);
  fastify.get("/:id",  UserController.findUser);
}

module.exports = routes
