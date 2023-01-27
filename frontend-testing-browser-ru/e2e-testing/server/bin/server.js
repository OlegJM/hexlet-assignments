#!/usr/bin/env node

import getApp from '../index.js';

const port = process.env.PORT || 8080;
const host = '0.0.0.0';

const app = await getApp();

app.listen({ port, host }, () => {
  // eslint-disable-next-line
  console.log(`Server is running on port: ${port}`);
});
