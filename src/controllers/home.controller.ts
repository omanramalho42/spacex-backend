import { FastifyReply, FastifyRequest } from "fastify";

async function welcome(request: FastifyRequest, reply: FastifyReply) {
  try {
    reply.code(201).send({ message: 'Fullstack Challenge 🏅 - Space X API' })
  } catch (err) {
    console.log(err, ' error');
    reply.status(500).send(err);
  }
}

module.exports = {
  welcome
}