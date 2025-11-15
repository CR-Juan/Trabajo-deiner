import { useState, useEffect, useRef } from 'react';
import TrafficLight from './TrafficLight/TrafficLight';
import './App.css';

function App() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [cycleSpeed, setCycleSpeed] = useState(3000);
  const trafficLightsRef = useRef({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhase(prev => (prev + 1) % 3);
    }, cycleSpeed);

    return () => clearInterval(timer);
  }, [cycleSpeed]);

  useEffect(() => {
    updateTrafficLights(currentPhase);
  }, [currentPhase]);

  const updateTrafficLights = (phase) => {
    const lights = trafficLightsRef.current;
    
    switch(phase) {
      case 0:
        lights.north?.setColor('red');
        lights.south?.setColor('red');
        lights.east?.setColor('green');
        lights.west?.setColor('green');
        break;
      case 1:
        lights.north?.setColor('red');
        lights.south?.setColor('green');
        lights.east?.setColor('red');
        lights.west?.setColor('red');
        break;
      case 2:
        lights.north?.setColor('green');
        lights.south?.setColor('red');
        lights.east?.setColor('red');
        lights.west?.setColor('red');
        break;
    }
  };

  const registerLight = (direction, controller) => {
    trafficLightsRef.current[direction] = controller;
  };

  return (
    <div className="app-container">
      <div className="road-intersection">
        {/* Corners */}
        <div className="corner-nw">
          <TrafficLight 
            direction="west" 
            position="left"
            onMount={registerLight}
          />
        </div>
        <div className="corner-ne">
          <TrafficLight 
            direction="north" 
            position="top"
            onMount={registerLight}
          />
        </div>
        <div className="corner-sw">
          <TrafficLight 
            direction="south" 
            position="bottom"
            onMount={registerLight}
          />
        </div>
        <div className="corner-se">
          <TrafficLight 
            direction="east" 
            position="right"
            onMount={registerLight}
          />
        </div>

        {/* Roads */}
        <div className="vertical-road">
          <div className="road-marking vertical"></div>
        </div>
        <div className="horizontal-road">
          <div className="road-marking horizontal"></div>
        </div>
      </div>
    </div>
  );
}

export default App;