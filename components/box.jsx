import React from "react";
import { useState, useEffect } from "react";
import { Box3Helper, Side } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Edges } from "@react-three/drei";
import * as THREE from "three";

function Box(props) {
  const [geometry, setGeometry] = useState();
  // const [bbox, setBbox] = useState({
  //   max: { x: 2, y: 2, z: 2 },
  //   min: { x: 1, y: 1, z: 1 },
  // });

  useEffect(() => {
    const stlLoader = new STLLoader();
    stlLoader.load("Clothe clip.STL", (geo) => {
      geo.center();
      setGeometry(geo);

      // https://stackoverflow.com/questions/73139301/how-can-i-get-the-size-of-an-object-in-react-three-fiber
      // geo.computeBoundingBox();
      // setBbox(geo.boundingBox);
      // console.log(geo.boundingBox);
    });
  }, []);

  return (
    <>
      <mesh
        {...props}
        onClick={(e) => {
          // console.log(...e.object.quaternion);
          const quaternion = new THREE.Quaternion();

          quaternion.setFromUnitVectors(e.face.normal, e.object.rotation);

          // const quaternion2 = new THREE.Quaternion();
          // quaternion2.setFromUnitVectors(
          //   quaternion,
          //   new THREE.Vector3(0, -1, 0)
          // );

          // quaternion.multiply(new THREE.Quaternion(0, 0, 1, 0));

          e.object.rotation.set(0, 0, 0);

          quaternion.setFromUnitVectors(
            e.face.normal,
            new THREE.Vector3(0, -1, 0)
          );

          // console.log(quaternion);
          e.object.applyQuaternion(quaternion);
        }}
        geometry={geometry}
        //TODO: add auto scaling n positioning n also rever this
        // https://stackoverflow.com/questions/63311362/how-does-threejs-get-the-outermost-size-of-the-model
        scale={[0.05, 0.05, 0.05]}
        // rotation-zx={Math.PI / 2}
        recieveShadow={true}
        castShadow={true}>
        {/* <boxBufferGeometry /> */}
        <meshPhysicalMaterial color={"white"} />
      </mesh>
      {/* <mesh
        {...props}
        onClick={(e) => console.log(...e.face.normal)}
        //TODO: add auto scaling n positioning n also rever this
        // https://stackoverflow.com/questions/63311362/how-does-threejs-get-the-outermost-size-of-the-model
        scale={[0.05, 0.05, 0.05]}
        recieveShadow={true}
        castShadow={true}>
        <boxGeometry
          args={[
            Math.abs(bbox.max.x - bbox.min.x) + 0.5,
            Math.abs(bbox.max.y - bbox.min.y) + 0.5,
            Math.abs(bbox.max.z - bbox.min.z) + 0.5,
          ]}
        />
        <meshPhongMaterial color="#ffffff" opacity={0.1} transparent />
        <Edges color={"white"} />
      </mesh> */}
    </>
  );
}
export default Box;
