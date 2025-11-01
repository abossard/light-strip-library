import { WebSocket, WebSocketServer } from 'ws';

export class E131Listener {
  private socket: WebSocket;
  private onUpdate: (data: any) => void;

  constructor(url: string, onUpdate: (data: any) => void) {
    this.socket = new WebSocket(url);
    this.onUpdate = onUpdate;
    this.initialize();
  }

  private initialize() {
    this.socket.onmessage = (event) => {
      let dataString: string;
      if (typeof event.data === 'string') {
        dataString = event.data;
      } else if (event.data instanceof ArrayBuffer) {
        dataString = new TextDecoder().decode(event.data);
      } else if (Buffer.isBuffer(event.data)) {
        dataString = event.data.toString('utf-8');
      } else {
        console.error('Unsupported WebSocket data type:', typeof event.data);
        return;
      }
      const data = JSON.parse(dataString);
      this.onUpdate(data);
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }

  public close() {
    this.socket.close();
  }
}
