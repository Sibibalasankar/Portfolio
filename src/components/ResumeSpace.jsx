// src/components/ResumeSpace.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Text, Float, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const ResumeSpace = () => {
  const scroll = useScroll();
  const groupRef = useRef();

  useFrame((state) => {
    const offset = scroll.offset; 
    if (groupRef.current) {
      groupRef.current.position.z = offset * 200; 
    }
  });

  return (
    <group ref={groupRef}>
      <Sparkles count={500} size={5} scale={[100, 100, 100]} color="#44a02c" />
      
      {/* Test big boxes to ensure visibility */}
      <mesh position={[0, 0, -10]}>
        <boxGeometry args={[5, 5, 5]} />
        <meshNormalMaterial />
      </mesh>

      <mesh position={[0, 0, -60]}>
        <boxGeometry args={[5, 5, 5]} />
        <meshNormalMaterial />
      </mesh>

      <mesh position={[0, 0, -120]}>
        <boxGeometry args={[5, 5, 5]} />
        <meshNormalMaterial />
      </mesh>

      {/* Main Text sections as flat planes to rule out Text component issues */}
      <Text position={[0, 5, -5]} fontSize={1} color="#44a02c">
        TEST_TEXT_01
      </Text>

      <ambientLight intensity={3} />
    </group>
  );
};

export default ResumeSpace;
