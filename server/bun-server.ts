import Bun from 'bun'

const server = Bun.serve<{ authToken: string }>({

  fetch(req, server) {
    console.log(`Received Nothing`);

    const success = server.upgrade(req);
    if (success) {
      // Bun automatically returns a 101 Switching Protocols
      // if the upgrade succeeds
      return undefined;
    }

    // handle HTTP request normally
    return new Response("Hello world!");
  },
  websocket: {
    // this is called when a message is received
    async message(ws, message) {
      console.log('wss', ws)
      console.log(`Received ${message}`);
      // send back a message
      ws.send(`You said: ${message}`);
    },
    async open(ws) {
      console.log('wsss open', ws)
    },
    async close(ws, code, message) {
      console.info('wssss close', ws)
    },
    async drain(ws) {
      console.info('wssss drain', ws)
    },
  },
  port: process.env.PORT ?? 8000
});



console.log(`Listening on ${server.hostname}:${server.port}`);
