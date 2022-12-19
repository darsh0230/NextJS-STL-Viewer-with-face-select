import style from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";

import Box from "../components/box";
import LightBulb from "../components/lightBulb";
import Floor from "../components/floor";
import OrbitControls from "../components/OrbitControls";
import { Plane } from "@react-three/drei";

import * as THREE from "three";

export default function Home() {
  // // https://www.youtube.com/watch?v=CbUhot3K-gc
  // const pointer = new THREE.Vector2();
  // const raycaster = new THREE.Raycaster();

  //   const onMouseClick = (event) => {
  //     pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  //     pointer.y = (event.clientY / window.innerHeight) * 2 + 1;
  //     raycaster.setFromCamera(pointer, test.camera);
  //   };
  //   window.addEventListener("mousedown");

  return (
    <div className={style.scene}>
      <Canvas
        shadows={true}
        className={style.canvas}
        camera={{
          position: [-6, 7, 7],
        }}>
        <ambientLight color={"white"} intensity={0.2} />
        <LightBulb position={[0, 3, 0]} />
        <Box rotateX={3} rotateY={0.2} />
        {/* <Floor position={[0, -1, 0]} /> */}
        <primitive object={new THREE.AxesHelper(10)} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
