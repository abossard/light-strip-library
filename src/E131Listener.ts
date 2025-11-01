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
      } else if (typeof Buffer !== 'undefined' && Buffer.isBuffer(event.data)) {
        // Node.js environment with Buffer
        dataString = event.data.toString('utf-8');
      } else if (event.data && typeof event.data.toString === 'function') {
        // Fallback for other types with toString
        dataString = event.data.toString();
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
