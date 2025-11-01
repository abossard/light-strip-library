import { createServer } from 'http';
import { Server } from 'ws';
import { LightStrip } from './LightStrip';
import { readFile } from 'fs';
import { join } from 'path';

// Interface for objects that can control LED colors
interface ILightStripController {
  setLEDColor(index: number, color: string): void;
}

export class SSEServer {
  private clients: Set<any>;
  private lightStrip: ILightStripController;

  constructor(lightStrip: ILightStripController) {
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

        this.clients.add(res);

        req.on('close', () => {
          this.clients.delete(res);
        });
      }
    });

    const wss = new Server({ server });

    wss.on('connection', (ws) => {
      ws.on('message', (message) => {
        const data = JSON.parse(message.toString());
        this.handleMessage(data);
      });
    });

    server.listen(port, () => {
      console.log(`SSE server listening on port ${port}`);
    });
  }

  private handleMessage(data: any) {
    if (data.type === 'updateColor') {
      this.lightStrip.setLEDColor(data.index, data.color);
      this.broadcast(JSON.stringify({ type: 'update', index: data.index, color: data.color }));
    }
  }

  private broadcast(message: string) {
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
