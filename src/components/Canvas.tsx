import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import TWEEN from "@tweenjs/tween.js";

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);

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
      "models/scene.gltf",
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;
        scene.add(model);

        // Calculate bounding box and center camera
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        camera.lookAt(center);
        camera.position.set(center.x, center.y, box.getSize(new THREE.Vector3()).length() * 1.5);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    const clock = new THREE.Clock();
    let jumpTime = 0;
    const jumpDuration = 0.5;
    const jumpHeight = 0.5;

    const tick = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (modelRef.current) {
        modelRef.current.rotation.y += delta * 0.3;

        // 一定時間ごとにジャンプ
        if (elapsedTime > jumpTime) {
          jumpTime = elapsedTime + 3; // 3秒ごとにジャンプ
          const jumpTween = new TWEEN.Tween(modelRef.current.position)
            .to({ y: jumpHeight }, jumpDuration * 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onComplete(() => {
              new TWEEN.Tween(modelRef.current!.position)
                .to({ y: 0 }, jumpDuration * 1000)
                .easing(TWEEN.Easing.Quadratic.In)
                .start();
            })
            .start();
        }
      }

      TWEEN.update();
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
  
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", zIndex: 0 }} />
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#CE6363",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "3rem",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            color:"#D06364"
          }}
        >
          新規開校！
        </h3>
        <p style={{ fontSize: "1.5rem", marginTop: "11rem", color:"#D1B2B8" }}>
          受験に役立つ一生モノの絶対暗算力！
        </p>
      </div>
    </div>
  );
}

export default Canvas;



