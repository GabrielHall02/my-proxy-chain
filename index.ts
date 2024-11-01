import { Server } from './src/index';
import { startApiService } from './src/index';

startApiService();

const server = new Server({
  // Port where the server will listen. By default 8000.
  port: 8080,

  // Enables verbose logging
  verbose: true,

  prepareRequestFunction: async () => {
    return {
      upstreamProxyUrl: `http://1.1.1.1:13200`,
    };
  },
});

server.listen(() => {
  console.log(`Proxy server is listening on port ${server.port}`);
});

// Emitted when HTTP connection is closed
server.on('connectionClosed', ({ connectionId, stats, clientIp }) => {
  console.log(`Connection ${connectionId}:${clientIp}  closed`);
  console.dir(stats);

});

// Emitted when HTTP request fails
server.on('requestFailed', ({ request, error }) => {
  console.log(`Request ${request.url} failed`);
  console.error(error);
});
