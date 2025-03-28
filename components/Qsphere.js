import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { useEffect, useState } from 'react';

const QSphere = ({ probabilities }) => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (!probabilities) return;
    
    const newPoints = Object.entries(probabilities).map(([state, probability]) => {
      const theta = Math.acos(2 * probability - 1);
      const phi = parseInt(state, 2) * (Math.PI / 4);

      return {
        x: Math.sin(theta) * Math.cos(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(theta),
        probability,
      };
    });

    setPoints(newPoints);
  }, [probabilities]);

  return (
    <div style={{ border: '2px solid black', padding: '10px', borderRadius: '4px', backgroundColor: '#9ACBD0' }}>
      <h3>Q-sphere</h3>
      <Canvas style={{ width: '400px', height: '300px', background: '#9ACBD0' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <Sphere args={[1, 32, 32]} wireframe>
          <meshBasicMaterial attach="material" color="white" wireframe />
        </Sphere>

        {points.map((p, i) => (
          <Sphere key={i} position={[p.x, p.y, p.z]} args={[0.1, 16, 16]}>
            <meshStandardMaterial color={`rgb(${255 * p.probability}, 0, 255)`} />
          </Sphere>
        ))}

        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default QSphere;