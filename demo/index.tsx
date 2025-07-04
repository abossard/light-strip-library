import React from 'react';
import ReactDOM from 'react-dom/client';
import EnhancedLightStrip from './EnhancedLightStrip';

const App: React.FC = () => {
  return (
    <div>
      <h1>🎨 Light Strip Library Demo</h1>
      <p>This demo showcases different LED strip configurations and animation patterns.</p>
      
      <EnhancedLightStrip 
        shape="straight" 
        numLEDs={20} 
        width={600} 
        height={150}
      />
      
      <EnhancedLightStrip 
        shape="circular" 
        numLEDs={24} 
        width={400} 
        height={400}
      />
      
      <EnhancedLightStrip 
        shape="square" 
        numLEDs={32} 
        width={500} 
        height={500}
      />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);