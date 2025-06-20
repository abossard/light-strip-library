import WebSocket from 'ws';

const url = process.env.LEDFX_URL || 'ws://localhost:8080';
const numLeds = parseInt(process.env.LEDFX_LEDS || '10', 10);

const ws = new WebSocket(url);

ws.on('open', () => {
  let index = 0;
  setInterval(() => {
    const color = `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0')}`;
    ws.send(JSON.stringify({ type: 'updateColor', index, color }));
    index = (index + 1) % numLeds;
  }, 100);
});


