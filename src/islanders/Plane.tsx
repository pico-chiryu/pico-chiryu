import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const planeScene = "/3d/plane.glb";

export function Plane({ ...props }) {
  const ref = useRef();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    // アニメーションを開始
    actions["Take 001"].play();

    // コンポーネントがアンマウントされたときにアニメーションを停止
    return () => {
      actions["Take 001"].stop();
    };
  }, [actions]);

  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  );
}