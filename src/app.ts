import {
  getDateNullRouteOptions,
  getDateRouteOptions,
} from '#app/modules/api/date/date.route.js';
import Ajv from 'ajv';
import fastify from 'fastify';

interface BuildOptions {
  fastifyServerOptions: Parameters<typeof fastify>[0];
}

/**
 * App factory
 */
export const build = ({ fastifyServerOptions }: BuildOptions) => {
  const app = fastify(fastifyServerOptions);

  app.route(getDateRouteOptions);
  app.route(getDateNullRouteOptions);

  const ajv = new Ajv({
    removeAdditional: false,
    useDefaults: true,
    coerceTypes: true,
    allErrors: true,
  });

  app.setValidatorCompiler(({ schema }) => ajv.compile(schema));

  return app;
};
