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
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);

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
        camera.position.set(
          center.x,
          center.y,
          box.getSize(new THREE.Vector3()).length() * 1.5
        );
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

    const onResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    };

    window.addEventListener("resize", onResize);

    tick();

    // Clean up on component unmount
    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return <canvas
  ref={canvasRef}
  style={{
    width: "100%",
    height: "100vh",
    background: "#8BDBC0",
    background: "linear-gradient(126deg, #8BDBC0 0%, #4DA890 50%, #1E6B5A 96%)",
    position: "relative",
    top: 0,
    left: 0,
  }}
/>;
}

export default Canvas;



