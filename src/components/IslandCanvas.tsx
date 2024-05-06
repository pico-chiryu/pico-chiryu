import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Canvas() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const container = canvas.parentElement;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0xBEFEE0);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1);
    pointLight2.position.set(-5, 5, 5);
    scene.add(pointLight2);

    // 3D Model Loader
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "island/scene.gltf",
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        // Calculate bounding box and center camera
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());

        scene.add(model);

        camera.lookAt(model.position);
        camera.position.set(center.x, center.y, box.getSize(new THREE.Vector3()).length() * 1.5);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    const clock = new THREE.Clock();

    const tick = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (modelRef.current) {
        modelRef.current.rotation.y -= delta * 0.2; // 右回転
      }

      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    const resizeCanvas = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    tick();

    // Clean up on component unmount
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "80vh" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", zIndex: 0 }} />
    </div>
  );
}

export default Canvas;