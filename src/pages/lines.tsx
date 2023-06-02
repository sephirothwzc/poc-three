import { FC, useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * 画线
 * @returns
 */
const Lines: FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 场景
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef?.current?.appendChild?.(renderer.domElement);

    // 相机
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    // 创建场景
    const scene = new THREE.Scene();

    // 创建线
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

    // 顶点的geometry（几何体）
    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);

    scene.add(line);
    renderer.render(scene, camera);

    return () => {
      // 在组件卸载时清除渲染器
      sceneRef?.current?.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={sceneRef}></div>;
};

export default Lines;
