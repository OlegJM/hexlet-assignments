module.exports = {
  server: {
    command: 'PORT=5000 npm start',
    port: 5000,
  },
  launch: {
    executablePath: '/usr/bin/google-chrome',
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    args: [
      '--no-sandbox',
    ],
  },
};
