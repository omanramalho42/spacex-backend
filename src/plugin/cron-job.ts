import mailer from "nodemailer";

import fastifyCron from 'fastify-cron';
import fastifyPlugin from 'fastify-plugin';

import axios from 'axios';

import { FastifyInstance } from 'fastify';

const Launcher = require('../model/launches.schema');
const Rocket = require('../model/rockets.schema');

// PEGAR TODAS AS DATAS DO ULTIMO FOGUETES 
// REDUCE PARA SABER A VARIANCIA ENTRE OS DADOS
// APLICAR NO CRON A PARTIR DA INFORMAÇÃO OBTIDA

// Simule a função para inserir dados no banco de dados
export async function insertDataIntoDatabase(data) {
  for(const launches of data) {
    const existSameLaunch = await Launcher.findOne({ 
      flight_number: launches.flight_number
    });
    console.log(existSameLaunch,'exist same launche')
    if (!existSameLaunch) {
      let rocketId;
      if (launches.rocket && launches.rocket.rocket_id) {
        // Encontre o Rocket correspondente pelo ID
        const rocket = await Rocket.findOne({ rocket_id: launches.rocket.rocket_id });
        if (!rocket) {
          const newRocket = new Rocket(launches.rocket);
          await newRocket.save();

          rocketId = newRocket._id;
        } else {
          rocketId = rocket._id
        }
      }

      const newLauncher = new Launcher({...launches, rocket: rocketId });
      // console.log(newLauncher,'rockets');
      const result = await newLauncher.save();

      console.log('Inserindo dados no banco de dados:', result);
    } else {
      console.log("Exist same launch into database info (!)");
    }
  }
}

async function cronSchedule(fastify: FastifyInstance, options) {
  try {
    fastify.register(fastifyCron, {
      jobs: [
        {
          cronTime: '0 9 * * *', // AS 9 DA MANHÃ
          // cronTime: '*/1 * * * *', // A cada minuto (para testes)
          onTick: async () => {
            console.log('passei aqui (2)')
            try {
              const response = await axios.get('https://api.spacexdata.com/v3/launches');
              const data = response.data;
              console.log('Disparando a tarefa de cron...');
              // função para inserir os dados no banco de dados
              await insertDataIntoDatabase(data);

              const transporter = mailer.createTransport({
                host: "omanapple42@hotmail.com",
                service: 'hotmail',
                auth: {
                  user: 'omanapple42@hotmail.com',
                  pass: 'oman120600'
                },
              });
              
              const htmlTextInfoData = data.map((item) => {
                return (
                  `<b>${ item.mission_name }</b>`
                )
              })
              const now = new Date();
              const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

              const email = await transporter.sendMail({
                from: `"SPACEX 🚀 ${formattedDate} REFECTH DATA" <omanapple42@hotmail.com>`, 
                to: "omanapple42@hotmail.com, omanapple42@hotmail.com",
                subject: "Successfull Sync ✅",
                text: "Launchers sincronized has been successfull",
                html: htmlTextInfoData.toString(),
              })
              console.log(email.messageId,'mailer');
            } catch (error) {
              console.error('Erro ao obter dados da API da SpaceX:', error);
            }
          },
          start: true
        }
      ]
    })

    console.log("passei aqui!");
  } catch (err) {
    const transporter = mailer.createTransport({
      host: "omanapple42@hotmail.com",
      service: 'hotmail',
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'omanapple42@hotmail.com',
        pass: 'oman120600'
      },
    });
    
    const email = await transporter.sendMail({
      from: '"SPACEX 🚀" <omanapple42@hotmail.com>', // sender address
      to: "omanapple42@hotmail.com, omanapple42@hotmail.com", // list of receivers
      subject: "Error Sync ⚠️", // Subject line
      text: "Launchers sincronized has been failed", // plain text body
      html: '', // html body
    })
    console.log(email.messageId,'mailer');
    console.log(err, 'erro');
  }
}
export default fastifyPlugin(cronSchedule)
