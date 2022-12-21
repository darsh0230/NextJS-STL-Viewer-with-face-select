import style from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";

import Box from "../components/box";
import LightBulb from "../components/lightBulb";
import Floor from "../components/floor";
import OrbitControls from "../components/OrbitControls";
import { Plane } from "@react-three/drei";

import * as THREE from "three";

export default function CustStlViewer() {
  return (
    <div className={style.scene}>
      <Canvas
        shadows={true}
        className={style.canvas}
        camera={{
          position: [-6, 7, 7],
        }}>
        <ambientLight color={"white"} intensity={0.2} />
        {/* <LightBulb position={[0, 8, 0]} /> */}
        <Box modelUrl="cube.stl" />
        {/* <Floor position={[0, -1, 0]} /> */}
        <primitive object={new THREE.AxesHelper(10)} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
