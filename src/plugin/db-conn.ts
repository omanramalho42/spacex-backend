import { MongoMemoryServer } from 'mongodb-memory-server'
import fastifyPlugin from 'fastify-plugin';
import fastifyMongo from '@fastify/mongodb';
import { FastifyInstance } from 'fastify';

async function dbConnector(fastify: FastifyInstance, options) {
  try {
    const mongodb = await MongoMemoryServer.create();
    const uri = mongodb.getUri();
    await mongodb.stop();

    fastify.register(fastifyMongo, {
      forceClose: true, // Force close the connection if it fails
      url: process.env.MONGODB_URI,
    });
    console.log('DB HAS BEEN CONNECTED');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(dbConnector);
