import React, { useState } from 'react';

export interface LightStripEditorProps {
  rows?: number;
  cols?: number;
}

const defaultSize = 10;

const LightStripEditor: React.FC<LightStripEditorProps> = ({ rows = defaultSize, cols = defaultSize }) => {
  const [grid, setGrid] = useState<string[][]>(Array.from({ length: rows }, () => Array(cols).fill('#000000')));
  const [currentColor, setCurrentColor] = useState<string>('#ff0000');

  const toggleCell = (r: number, c: number) => {
    setGrid(prev => {
      const copy = prev.map(row => [...row]);
      copy[r][c] = copy[r][c] === '#000000' ? currentColor : '#000000';
      return copy;
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '0.5rem' }}>
        <label>Select Color: </label>
        <input type="color" value={currentColor} onChange={e => setCurrentColor(e.target.value)} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 20px)`, gap: 2 }}>
        {grid.map((row, r) =>
          row.map((color, c) => (
            <div
              key={`${r}-${c}`}
              onClick={() => toggleCell(r, c)}
              style={{ width: 20, height: 20, backgroundColor: color, border: '1px solid #333', cursor: 'pointer' }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default LightStripEditor;
