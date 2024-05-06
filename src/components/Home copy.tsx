import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Bird } from "../islanders/Bird";
import { Sky } from "../islanders/Sky";
import Loader from "./Loader";
import { Island } from "../islanders/Island";
import { Plane } from "../islanders/Plane";
import HomeInfo from "./HomeInfo";


const AnimatedIsland = ({ isRotating, setIsRotating, setCurrentStage, position, rotation, scale }) => {
  const islandRef = useRef();

  useFrame(() => {
    if (islandRef.current) {
      islandRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Island
      ref={islandRef}
      isRotating={isRotating}
      setIsRotating={setIsRotating}
      setCurrentStage={setCurrentStage}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
};

const AnimatedPlane = ({ isRotating, position, rotation, scale }) => {
  const planeRef = useRef();

  useFrame(({ clock }) => {
    if (planeRef.current) {
      planeRef.current.position.x = Math.sin(clock.elapsedTime * 0.5) * 10;
      planeRef.current.position.z = Math.cos(clock.elapsedTime * 0.5) * 10;
    }
  });

  return (
    <Plane
      ref={planeRef}
      isRotating={isRotating}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
};

const Home = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);

  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition];
  };

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  return (
    <section className='w-full h-screen relative'>
   <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
  <HomeInfo />
</div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            skyColor='#b1e1ff'
            groundColor='#000000'
            intensity={1}
          />

          <Bird />
          <Sky isRotating={isRotating} />
          <AnimatedIsland
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={islandScale}
          />
          <AnimatedPlane
            isRotating={isRotating}
            position={biplanePosition}
            rotation={[0, 20.1, 0]}
            scale={biplaneScale}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;