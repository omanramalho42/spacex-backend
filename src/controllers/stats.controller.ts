import { FastifyReply, FastifyRequest } from "fastify";
const Launcher = require('../model/launches.schema');
const Rocket = require('../model/rockets.schema');

async function getBarStats(request: FastifyRequest, reply: FastifyReply) {
  try {
    // console.log("passei aqui!");
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
    const barData: { [key: string]: { month: string, amount: number, rockets: { [name: string]: { name: string, value: number } } } } = 
    launcherData.reduce((acc, launcher) => {
      const launcherYear = launcher.launch_year;
      if (!acc[launcherYear]) {
        acc[launcherYear] = { month: '', rockets: {}, amount: 0 };
      }
      if (launcher.launch_date_local && launcher.launch_year) {
        const { launch_date_local, rocket: { rocket_name } } = launcher;
        acc[launcherYear].month = launch_date_local;
  

        if (launcher.rocket.first_stage.cores) {
          launcher.rocket.first_stage.cores.map(({ reused }) => {
            if (reused) {
              if (!acc[launcherYear].rockets[`${rocket_name} Reused`]) {
                acc[launcherYear].rockets[`${rocket_name} Reused`] = { 
                  name: `${rocket_name} Reused`,
                  value: 0,
                };
                acc[launcherYear].rockets[`${rocket_name} Reused`].value++;
              } else {
                acc[launcherYear].rockets[`${rocket_name} Reused`].value++;
              }
            }
          })
        }

        if (!acc[launcherYear].rockets[rocket_name]) {
          acc[launcherYear].rockets[rocket_name] = { 
            name: rocket_name, 
            value: 0 
          };
        }
        acc[launcherYear].rockets[rocket_name].value++;
      }
      acc[launcherYear].amount++;
      return acc;
    }, {} as { [key: string]: { month: string, amount: number, rockets: { [name: string]: { name: string, value: number } }} });

    // console.log(barData,'bardata');

    reply.code(201).send(barData)
  } catch (err) {
    console.log(err, ' error');
    reply.status(500).send(err);
  }
}

async function getPieStats(request: FastifyRequest, reply: FastifyReply) {
  try {
    // console.log("passei aqui!");
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
    const pieData: { [key: string]: { value: number, success: number; errors: number; reused: number } } = 
    launcherData.reduce((acc, launcher) => {
      const rocketName = launcher.rocket.rocket_name;
      if (!acc[rocketName]) {
        acc[rocketName] = { value: 0, success: 0, errors: 0, reused: 0 };
      }
      if (launcher.launch_success) {
        acc[rocketName].success++;
      } else {
        acc[rocketName].errors++;
      }

      if (launcher.rocket.first_stage.cores) {
        launcher.rocket.first_stage.cores.map(({ reused }) => {
          if (reused) {
            if (!acc[`${rocketName} Reused`]) {
              acc[`${rocketName} Reused`] = { 
                value: 0, 
                success: 0, 
                errors: 0, 
                reused: 0 
              };
              acc[`${rocketName} Reused`].reused++;
              acc[`${rocketName} Reused`].value++;
            } else {
              acc[`${rocketName} Reused`].reused++;
              acc[`${rocketName} Reused`].value++;
            }
          }
        })
      }

      acc[rocketName].value++

      return acc;
    },{} as { [key: string]: { value: number, success: number; errors: number; reused: number } });

    // console.log(pieData,'bardata');

    reply.code(201).send(pieData)
  } catch (err) {
    console.log(err, ' error');
    reply.status(500).send(err);
  }
}

module.exports = {
  getBarStats,
  getPieStats
}