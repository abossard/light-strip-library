export class ArtNetListener {
  private socket: WebSocket;
  private onUpdate: (data: any) => void;

  constructor(url: string, onUpdate: (data: any) => void) {
    this.socket = new WebSocket(url);
    this.onUpdate = onUpdate;
    this.initialize();
  }

  private initialize() {
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
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
