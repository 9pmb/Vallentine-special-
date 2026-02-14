
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Fix: Define intrinsic Three.js elements as constants to resolve 'Property does not exist on type JSX.IntrinsicElements' 
// errors when the local TypeScript environment doesn't automatically pick up the @react-three/fiber JSX namespace.
const mesh = 'mesh' as any;
const extrudeGeometry = 'extrudeGeometry' as any;
const points = 'points' as any;
const bufferGeometry = 'bufferGeometry' as any;
const bufferAttribute = 'bufferAttribute' as any;
const pointsMaterial = 'pointsMaterial' as any;
const ambientLight = 'ambientLight' as any;
const pointLight = 'pointLight' as any;
const spotLight = 'spotLight' as any;

const HeartShape = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const x = 0, y = 0;
    s.moveTo(x + 5, y + 5);
    s.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    s.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    s.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    s.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    s.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    s.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
    return s;
  }, []);

  const extrudeSettings = {
    depth: 2,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 1,
    bevelThickness: 1,
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(t / 2) * 0.3;
    meshRef.current.position.y = Math.sin(t * 1.2) * 0.4;
    meshRef.current.scale.setScalar(1 + Math.sin(t * 2.5) * 0.08);
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI, 0, 0]} position={[0, 1.5, 0]} scale={0.12}>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <MeshDistortMaterial 
        color="#ff1e56" 
        speed={1.5} 
        distort={0.15} 
        radius={1} 
        emissive="#300000"
      />
    </mesh>
  );
};

const Particles = ({ count = 40 }) => {
  const pointsData = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 30;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null!);
  useFrame((state) => {
    pointsRef.current.rotation.y += 0.0005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={pointsData.length / 3}
          array={pointsData}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.12} color="#ff85a1" transparent opacity={0.4} />
    </points>
  );
};

export const HeartScene = () => {
  return (
    <div className="w-full h-full pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#ff0000" />
        <spotLight position={[-5, 5, 10]} angle={0.2} penumbra={1} intensity={1} color="#ff0080" />
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <HeartShape />
        </Float>
        <Particles count={150} />
      </Canvas>
    </div>
  );
};
