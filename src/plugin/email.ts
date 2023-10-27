import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

async function emailConn(fastify: FastifyInstance, options) {
  try {
    fastify.register(require('fastify-mailer'), {
      defaults: { from: 'SpaceX <omanapple42@hotmail.com>' },
      transport: {
        host: 'smtp.example.tld',
        port: 465,
        secure: true, // use TLS
        auth: {
          user: 'omanapple42@hotmail.com',
          pass: 'oman120600'
        }
      }
    })
    console.log('EMAIL HAS BEEN CONNECT');
  } catch (err) {
    console.error('Error connecting EMAIL:', err);
  }
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(emailConn);
