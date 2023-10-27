import { FastifyReply, FastifyRequest } from "fastify";

const User = require('../model/user.schema')

async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
  try {
    const users = await User.find();
    reply.code(201).send(users).then(() => { console.log('teste') }, () => {});
  } catch (err) {
    console.log(err, ' error');
    reply.status(500).send(err);
  }
}

async function findUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id }: any = request.params;
    if (!id) {
      return reply.code(400).send('Id não encontrado');
    }

    const user = await User.findById(id);
    if (!user) {
      return reply.code(402).send('Usuario não existe');
    }
    reply.code(203).send(user);
  } catch (error) {
    console.log(error,'erro capturado');
    reply.code(500).send(error);
  }
}

async function createUser(request:FastifyRequest, reply: FastifyReply) {
  try {
    // const existUser = User.find({ email: request.body.email });
    // if (existUser) {
    //   return reply.send("Usuário já existe");
    // }
    console.log(typeof request.body);
    console.log(request.body)
    const user = new User(request.body);

    const result = await user.save();
    reply.code(201).send(result);
  } catch (error) {
    reply.code(500).send(error);
  }
}

async function updateUser(request:FastifyRequest, reply: FastifyReply) {
  try {
    const { id }: any = request.params;
    const newUser = request.body;

    if (!id) {
      return reply.send('Id não encontrado');
    }
    const updatedUser = await User.findByIdAndUpdate(id, newUser, {
      new: true
    });

    reply.send(updatedUser);
  } catch (err) {
    reply.code(500).send(err);
  }
}

async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id }: any = request.params;
    if (!id) {
      return reply.send('Id não encontrado');
    };
    const deletedUser = await User.findByIdAndDelete(id);

    reply.code(203).send(deletedUser);
  } catch (err) {
    reply.code(500).send(err);
  }
}

module.exports = {
  getAllUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser
}