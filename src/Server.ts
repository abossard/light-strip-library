import { createServer } from 'http';
import { Server } from 'ws';
import { LightStrip } from './LightStrip';
import { readFile } from 'fs';
import { join } from 'path';
import { Logger } from './logger';

export class SSEServer {
  private clients: Set<any>;
  private lightStrip: LightStrip;

  constructor(lightStrip: LightStrip) {
    this.clients = new Set();
    this.lightStrip = lightStrip;
  }

  start(port: number) {
    const server = createServer((req, res) => {
      if (req.url === '/kitchen-sink') {
        this.serveKitchenSinkExample(req, res);
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        });

        Logger.info('SSE client connected');
        this.clients.add(res);

        req.on('close', () => {
          Logger.info('SSE client disconnected');
          this.clients.delete(res);
        });
      }
    });

    const wss = new Server({ server });

    Logger.info('WebSocket server started');

    wss.on('connection', (ws) => {
      Logger.info('WebSocket client connected');
      ws.on('message', (message) => {
        Logger.debug(`WebSocket message: ${message}`);
        const data = JSON.parse(message.toString());
        this.handleMessage(data);
      });
      ws.on('close', () => {
        Logger.info('WebSocket client disconnected');
      });
    });

    server.listen(port, () => {
      Logger.info(`SSE server listening on port ${port}`);
    });
  }

  private handleMessage(data: any) {
    if (data.type === 'updateColor') {
      Logger.info(`Color update for LED ${data.index}: ${data.color}`);
      this.lightStrip.setLEDColor(data.index, data.color);
      this.broadcast(JSON.stringify({ type: 'update', index: data.index, color: data.color }));
    }
  }

  private broadcast(message: string) {
    Logger.debug(`Broadcasting: ${message}`);
    for (const client of this.clients) {
      client.write(`data: ${message}\n\n`);
    }
  }

  private serveKitchenSinkExample(req: any, res: any) {
    const filePath = join(__dirname, '../example/kitchen-sink.html');
    readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
}
