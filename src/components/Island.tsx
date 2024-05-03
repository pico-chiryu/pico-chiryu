import React, { useEffect, useRef, useState } from "react";
import { a } from "@react-spring/three";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

const islandScene = '/3d/island.glb'; // publicディレクトリからの相対パス

export function Island({ ...props }) {
  const { nodes, materials, animations } = useGLTF(islandScene);
  useGLTF.preload(islandScene);
  
  const [isRotating, setIsRotating] = useState(false);
  const islandRef = useRef();
  const { gl, viewport } = useThree();
  const { actions } = useAnimations(animations, islandRef);

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    lastX.current = clientX;
  };

  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (event) => {
    if (isRotating) {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
    };
  }, [gl]);

  useFrame(() => {
    if (!isRotating && Math.abs(rotationSpeed.current) > 0.001) {
      rotationSpeed.current *= dampingFactor;
      islandRef.current.rotation.y += rotationSpeed.current;
    }
  });

  return (
    <a.group ref={islandRef} {...props}>
      {Object.entries(nodes).map(([name, node]) => (
        <mesh key={name} geometry={node.geometry} material={materials[node.material.name]} />
      ))}
    </a.group>
  );
}

export default Island;
