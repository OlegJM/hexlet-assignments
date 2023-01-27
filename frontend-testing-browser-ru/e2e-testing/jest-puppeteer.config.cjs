module.exports = {
  server: {
    command: 'set PORT=5000&&npm start',
    port: 5000,
  },
  launch: {
    executablePath: '',
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    args: [
      '--no-sandbox',
    ],
  },
};
