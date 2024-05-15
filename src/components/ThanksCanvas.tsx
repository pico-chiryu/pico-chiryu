import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Canvas() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const modelRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !textRef.current) return;

    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    const textElement = textRef.current;

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
      "fox/scene.gltf",
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        // Calculate bounding box and center camera
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());

        scene.add(model);

        camera.lookAt(model.position);
        camera.position.set(center.x, center.y, box.getSize(new THREE.Vector3()).length() * 1.5);

        // Position the text elements
        const topTextPosition = new THREE.Vector3(0, box.max.y + 0.5, 0);
        const bottomTextPosition = new THREE.Vector3(0, box.min.y - 1, 0);
        positionTextElement(textElement.querySelector(".top-text"), topTextPosition);
        positionTextElement(textElement.querySelector(".bottom-text"), bottomTextPosition);
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
        modelRef.current.rotation.y = Math.sin(elapsedTime * 0.5) * 0.2;
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

    const positionTextElement = (element, position) => {
      const vector = position.clone().project(camera);
      const x = (vector.x + 1) / 2;
      const y = -(vector.y - 1) / 2;

      element.style.left = `${(x * 100).toFixed(2)}%`;
      element.style.top = `${((y - 0.01) * 100).toFixed(2)}%`;
      element.style.transform = `translate(-50%, 0%)`;
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
      <div
        ref={textRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <div className="top-text" style={{ position: "absolute", color: "#215364", textAlign: "center" }}>
          <h1 className="text-xl font-bold my-4">ありがとうございました！</h1>
          <p className="mb-12">
            お問い合わせいただき、誠にありがとうございます。
            <br />
            確認後、担当者よりご連絡いたします。
          </p>
        </div>
        <div className="bottom-text" style={{ position: "absolute", textAlign: "center", fontSize: "1.2rem" }}>
          <a href="/" className="text-indigo-600 hover:text-indigo-800">
            トップページに戻る
          </a>
        </div>
      </div>
    </div>
  );
}

export default Canvas;