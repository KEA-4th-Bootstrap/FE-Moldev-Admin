import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useCallback } from "react";
// import IslandModel from './IslandModel';
import { DirectionalLight, DoubleSide, Object3D } from "three";
import { ModelWrapper } from "./ModelWrapper";

const lightIntensity = 10.0;

const positions = [
  // points of cube, 8 points, length of each side is 10, center is (0, 0, 0)
  [5, 5, 5],
  [5, 5, -5],
  [5, -5, 5],
  [5, -5, -5],
  [-5, 5, 5],
  [-5, 5, -5],
  [-5, -5, 5],
  [-5, -5, -5],
];

const colors = ["#FF2450", "#008060", "#6A0DAD", "#FFD700", "#007FFF", "#FF9500", "#00A78B", "#FF5078"];
const useGettingShadowRef = () => {
  const shadowLightRef = useCallback((node: DirectionalLight) => {
    if (node !== null) {
      const shadow = node.shadow;
      shadow.mapSize.width = 3000;
      shadow.mapSize.height = 3000;
      shadow.camera.near = 10;
      shadow.camera.far = 500;
      shadow.camera.left = -200;
      shadow.camera.right = 200;
      shadow.camera.top = 200;
      shadow.camera.bottom = -200;
      shadow.radius = 5;
    }
  }, []);

  return [shadowLightRef];
};

const ModelContainer = () => {
  const [shadowLightRef] = useGettingShadowRef();
  const [shadowLightRef2] = useGettingShadowRef();

  return (
    <div className="grow h-full flex flex-col items-center justify-center">
      <Canvas shadows camera={{ fov: 75, near: 0.1, far: 500, position: [5, 15, 30] }}>
        <OrbitControls minDistance={15} maxDistance={45} />
        <ambientLight position={[0, 0, 0]} intensity={2} color="#FFFFFF" />
        <directionalLight
          position={[positions[0][0], positions[0][1], positions[0][2]]}
          intensity={lightIntensity}
          color={colors[0]}
        />
        <directionalLight
          position={[positions[1][0], positions[1][1], positions[1][2]]}
          intensity={lightIntensity}
          color={colors[1]}
        />
        <directionalLight
          position={[positions[2][0], positions[2][1], positions[2][2]]}
          intensity={lightIntensity}
          color={colors[2]}
        />
        <directionalLight
          position={[positions[3][0], positions[3][1], positions[3][2]]}
          intensity={lightIntensity}
          color={colors[3]}
        />
        <directionalLight
          position={[positions[4][0], positions[4][1], positions[4][2]]}
          intensity={lightIntensity}
          color={colors[4]}
        />
        <directionalLight
          position={[positions[5][0], positions[5][1], positions[5][2]]}
          intensity={lightIntensity}
          color={colors[5]}
        />
        <directionalLight
          position={[positions[6][0], positions[6][1], positions[6][2]]}
          intensity={lightIntensity}
          color={colors[6]}
        />
        <directionalLight
          position={[positions[7][0], positions[7][1], positions[7][2]]}
          intensity={lightIntensity}
          color={colors[7]}
        />
        <directionalLight
          castShadow
          ref={shadowLightRef}
          target={new Object3D()}
          position={[0, 0, 10]} // 위치
          intensity={5} // 강도
          color={"#ffffff"} // 색상
        />
        <directionalLight
          castShadow
          ref={shadowLightRef2}
          target={new Object3D()}
          position={[20, 0, 10]} // 위치
          intensity={5} // 강도
          color={"#ffffff"} // 색상
        />
        <mesh position={[0, 0, 0]} receiveShadow castShadow>
          <sphereGeometry args={[60, 32, 32]} />
          <meshStandardMaterial color={"white"} side={DoubleSide} />
        </mesh>
        {/* 섬 모델 */}
        <ModelWrapper />
      </Canvas>
    </div>
  );
};

export default ModelContainer;
