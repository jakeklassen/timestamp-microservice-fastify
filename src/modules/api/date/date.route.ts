import { FastifySchema, RouteOptions } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'node:http';

type GetDateRouteOptions = RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  { Params: { date: string } },
  unknown,
  FastifySchema
>;

/**
 * Route handler for `/api`
 */
export const getDateNullRouteOptions: RouteOptions = {
  method: 'GET',
  url: '/api',
  async handler(_request, reply) {
    const date = new Date();

    const response = {
      unix: Math.floor(date.getTime()),
      utc: date.toUTCString(),
    };

    reply.send(response);
  },
};

/**
 * Route handler of `/api/:date`
 * From what I can tell Fastify's router does not have optional params.
 */
export const getDateRouteOptions: GetDateRouteOptions = {
  method: 'GET',
  url: '/api/:date',
  schema: {
    params: {
      date: {
        type: ['string', 'null'],
      },
    },
  },
  async handler(request, reply) {
    let date = new Date(request.params.date);

    // If the date is invalid, try as a timestamp
    if (date.toJSON() === null) {
      date = new Date(parseInt(request.params.date, 10));
    }

    if (date.toJSON() === null && request.params.date != null) {
      reply.send({
        error: 'Invalid date',
      });

      return;
    }

    const response = {
      unix: Math.floor(date.getTime()),
      utc: date.toString() !== 'Invalid Date' ? date.toUTCString() : null,
    };

    reply.send(response);
  },
};
