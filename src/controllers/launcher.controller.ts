import { FastifyReply, FastifyRequest } from "fastify";

const Launcher = require('../model/launches.schema')
const Rocket = require('../model/rockets.schema')

async function getAllLaunchers(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { query }: any = request;

    const launchers = await Launcher.find();
    const launcherData: any[] = [];
    for(const launcher of launchers) {
      const connectRocket = 
        await Rocket.findById(launcher.rocket);
        launcherData.push({
          ...launcher.toJSON(),
          rocket: connectRocket ? connectRocket.toJSON() : null,
        });
    }
    
    const launchersFiltered: any[] = launcherData?.filter((item: any) => {
      if(
        item.mission_name.trim().toLowerCase().includes(query.search?.toLowerCase() || '')
        || item.flight_number.toString().trim().includes(query.search?.trim() || '')
        || item.rocket.rocket_name.toString().trim().includes(query.search?.toLowerCase().trim() || '')
      ) {
        return item
      } else {
        return null
      }
    })

    reply.code(201).send({
      results: launchersFiltered.slice(0, query.limit || launchersFiltered.length),
      totalDocs: launchersFiltered.length,
      page: query.page || '1',
      totalPages: Math.ceil(launchersFiltered.length / 5), 
      hasNext: Number(query.page) < 5 ?? false,
      hasPrev: Number(query.page) > 1 ?? false
    });
  } catch (err) {
    console.log(err, ' error');
    reply.status(500).send(err);
  }
}

async function findLauncher(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id }: any = request.params;
    if (!id) {
      return reply.code(400).send('Id não encontrado');
    }

    const launcher = await Launcher.findById(id);
    if (!launcher) {
      return reply.code(402).send('Lançamento não existe');
    }
    reply.code(203).send(launcher);
  } catch (error) {
    console.log(error,'erro capturado');
    reply.code(500).send(error);
  }
}

module.exports = {
  getAllLaunchers,
  findLauncher,
}