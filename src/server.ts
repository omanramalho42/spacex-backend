import fastify from 'fastify'

const UserRoute = require('./routes/user.routes');
const LauncherRoute = require('./routes/launcher.routes');
const HomeRoute = require('./routes/home.routes');
const RocketRoute = require('./routes/rocket.routes');
const StatsRoute = require('./routes/stats.routes');

import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from '@fastify/cors'

import dbConn from './plugin/db-conn'
import cronSchedule from './plugin/cron-job';
import emailConn from './plugin/email';

const app = fastify({
  logger: {
    level: 'debug',
    msgPrefix: 'info', 
    file: 'log.txt' 
  },
})
app.register(cors, {
  origin: '*',
  methods: 'GET,PUT,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true
});
dotenv.config();

app.decorate('conf', {
  db: process.env.MONGODB_URI,
  port: process.env.PORT
})

app.addHook('preHandler', async (request, reply) => {
  console.log("preHandler");
  request.log.info("preHandler");
});

app.addHook('onRequest', (request, reply, done) => {
  console.log("OnRequest");
  request.log.info("OnRequest");
  done();
});

app.register(dbConn);
app.register(cronSchedule);
app.register(emailConn); 

// @ts-ignore
mongoose.connect(app.hasDecorator(app.conf.db) ? app.conf.db : 'mongodb+srv://omanapple42:1w03tNtuZwNwPotq@spacex.6qi0yry.mongodb.net/', {
  // @ts-ignore
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to database'))
.catch(err => console.log('Erro during connection database: ', err));

console.log("INIT APP");
app.register(HomeRoute);
app.register(UserRoute, { prefix: '/api/v1/users' })
app.register(LauncherRoute, { prefix: '/api/v1/launchers' })
app.register(RocketRoute, { prefix: '/api/v1/rockets' })
app.register(StatsRoute, { prefix: '/api/v1/stats' })

app.log.warn('Server as running 🌞');

const start = async () => {
  try {
    // @ts-ignore
    await app.listen(app.conf.port || 5000)
    // @ts-ignore
    app.log.info(`Server as running on Port ${app.server.address().port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}
start();