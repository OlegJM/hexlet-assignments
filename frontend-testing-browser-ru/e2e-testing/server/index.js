import path from 'path';
import fastify from 'fastify';
import Pug from 'pug';
import pointOfView from '@fastify/view';
import fastifyStatic from '@fastify/static';
import fatifyReverseRoutes from 'fastify-reverse-routes';
import fastifyMethodOverride from 'fastify-method-override';
import fastifyFormbody from '@fastify/formbody';
import qs from 'qs';
import _ from 'lodash';
import { fileURLToPath } from 'url';

import { generateData } from './lib/index.js';
import addRoutes from './routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const registerPlugins = async (app) => {
  await app
    .register(fatifyReverseRoutes.plugin)
    .register(fastifyFormbody, { parser: qs.parse })
    .register(fastifyStatic, {
      root: path.join('/', 'node_modules', 'bootstrap', 'dist'),
      prefix: '/assets/',
    })
    .register(pointOfView, {
      engine: {
        pug: Pug,
      },
      includeViewExtension: true,
      templates: path.join(__dirname, '..', 'server', 'views'),
      defaultContext: {
        route: (...args) => app.reverse(...args),
        _,
      },
    })
    .register(fastifyMethodOverride);
};

export default async () => {
  const app = fastify({
    exposeHeadRoutes: false,
    logger: true,
  });

  await registerPlugins(app);
  addRoutes(app, generateData());

  return app;
};
