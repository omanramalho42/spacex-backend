import { FastifyReply, FastifyRequest } from "fastify";

const Rocket = require('../model/rockets.schema')

async function getAllRockets(request: FastifyRequest, reply: FastifyReply) {
  try {
    const rockets = await Rocket.find();
    reply.code(201).send(rockets);
  } catch (err) {
    console.log(err, ' error');
    reply.status(500).send(err);
  }
}

async function findRocket(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id }: any = request.params;
    if (!id) {
      return reply.code(400).send('Id não encontrado');
    }

    const launcher = await Rocket.findById(id);
    if (!launcher) {
      return reply.code(402).send('Foguete não existe');
    }
    reply.code(203).send(launcher);
  } catch (error) {
    console.log(error,'erro capturado');
    reply.code(500).send(error);
  }
}

module.exports = {
  getAllRockets,
  findRocket,
}