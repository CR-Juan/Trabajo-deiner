import { useState, useEffect } from 'react';
import './TrafficLight.css';

function TrafficLight({ direction, position, onMount }) {
  const [activeLight, setActiveLight] = useState('red');

  useEffect(() => {
    onMount(direction, {
      setColor: (color) => setActiveLight(color)
    });
  }, [direction, onMount]);

  return (
    <div className={`traffic-light-container ${direction}`}>
      <div className="traffic-light-box">
        <div className="light-label">
          {direction.toUpperCase()}
        </div>
        <div className="lights-container">
          <div className={`light red ${activeLight === 'red' ? 'active' : ''}`}></div>
          <div className={`light yellow ${activeLight === 'yellow' ? 'active' : ''}`}></div>
          <div className={`light green ${activeLight === 'green' ? 'active' : ''}`}></div>
        </div>
      </div>
    </div>
  );
}

export default TrafficLight;