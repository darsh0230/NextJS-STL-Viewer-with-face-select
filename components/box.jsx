import React from "react";
import { useState, useEffect } from "react";
import { Box3Helper, Side } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Edges } from "@react-three/drei";
import * as THREE from "three";

function CustModelLoader({
  props,
  modelUrl = "",
  onhoverColor = [0, 0, 0],
  modelColor = [0, 1, 1],
}) {
  const [geometry, setGeometry] = useState();
  const [geoScale, setGeoScale] = useState(1);
  const [geoPos, setGeoPos] = useState([0, 0, 0]);
  const colors = [];

  const [bbox, setBbox] = useState({
    max: { x: 0, y: 0, z: 0 },
    min: { x: 0, y: 0, z: 0 },
  });

  useEffect(() => {
    const stlLoader = new STLLoader();
    stlLoader.load(modelUrl, (geo) => {
      geo.center();
      setGeometry(geo);

      geo.computeBoundingBox();

      const computeScale =
        (1 /
          (Math.abs(Math.min(...geo.boundingBox.max)) +
            Math.abs(Math.min(...geo.boundingBox.min)))) *
        3;
      setGeoScale(computeScale);

      setGeoPos([
        (geo.boundingBox.max.x - geo.boundingBox.min.x) * 0.5 * computeScale,
        (geo.boundingBox.max.y - geo.boundingBox.min.y) * 0.5 * computeScale,
        (geo.boundingBox.max.z - geo.boundingBox.min.z) * 0.5 * computeScale,
      ]);

      setBbox({
        max: {
          x: geo.boundingBox.max.x * computeScale,
          y: geo.boundingBox.max.y * computeScale,
          z: geo.boundingBox.max.z * computeScale,
        },
        min: {
          x: geo.boundingBox.min.x * computeScale,
          y: geo.boundingBox.min.y * computeScale,
          z: geo.boundingBox.min.z * computeScale,
        },
      });
    });
  }, [modelUrl]);

  return (
    <>
      <mesh
        {...props}
        onUpdate={(e) => {
          if (JSON.stringify(e.geometry.attributes) !== "{}") {
            for (let i = 0; i < e.geometry.attributes.position.count; i++) {
              colors.push(...modelColor);
            }

            e.geometry.setAttribute(
              "color",
              new THREE.BufferAttribute(new Float32Array(colors), 3)
            );
          }
        }}
        onPointerMove={(e) => {
          const vertex = new THREE.Vector3();
          vertex.fromBufferAttribute(
            e.object.geometry.getAttribute("position"),
            e.face.a
          );

          e.object.geometry.setAttribute(
            "color",
            new THREE.BufferAttribute(new Float32Array(colors), 3)
          );

          const { color } = e.object.geometry.attributes;

          color.setX(e.face.a, onhoverColor[0]);
          color.setY(e.face.a, onhoverColor[1]);
          color.setZ(e.face.a, onhoverColor[2]);

          color.setX(e.face.b, onhoverColor[0]);
          color.setY(e.face.b, onhoverColor[1]);
          color.setZ(e.face.b, onhoverColor[2]);

          color.setX(e.face.c, onhoverColor[0]);
          color.setY(e.face.c, onhoverColor[1]);
          color.setZ(e.face.c, onhoverColor[2]);

          e.object.geometry.attributes.color.needsUpdate = true;
        }}
        onClick={(e) => {
          // apply rotation
          const quaternion = new THREE.Quaternion();
          quaternion.setFromUnitVectors(e.face.normal, e.object.rotation);

          e.object.rotation.set(0, 0, 0);
          quaternion.setFromUnitVectors(
            e.face.normal,
            new THREE.Vector3(0, -1, 0)
          );

          e.object.applyQuaternion(quaternion);

          e.object.position.set(0, 0, 0);

          // offsetting the rotated object
          var bbox = new THREE.Box3().setFromObject(e.object);
          setBbox(bbox);

          e.object.position.set(
            Math.abs(bbox.min.x),
            Math.abs(bbox.min.y),
            Math.abs(bbox.min.z)
          );
        }}
        geometry={geometry}
        scale={[geoScale, geoScale, geoScale]}
        recieveShadow={true}
        castShadow={true}
        position={geoPos}>
        {/* <boxBufferGeometry /> */}
        <meshPhysicalMaterial vertexColors={true} />
      </mesh>

      <mesh
        {...props}
        recieveShadow={true}
        castShadow={true}
        position={[
          (bbox.max.x - bbox.min.x) * 0.5,
          (bbox.max.y - bbox.min.y) * 0.5,
          (bbox.max.z - bbox.min.z) * 0.5,
        ]}>
        <boxGeometry
          args={[
            Math.abs(bbox.max.x - bbox.min.x),
            Math.abs(bbox.max.y - bbox.min.y),
            Math.abs(bbox.max.z - bbox.min.z),
          ]}
        />
        <meshPhongMaterial color="#ffffff" opacity={0.1} transparent />
        <Edges color={"white"} />
      </mesh>
    </>
  );
}
export default CustModelLoader;
