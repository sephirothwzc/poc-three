import { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * 画正方体
 * @returns
 */
const ThreeJSDemo = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scene: THREE.Scene,
      camera: THREE.Camera,
      renderer: THREE.WebGLRenderer,
      cube: THREE.Object3D<THREE.Event>;

    const init = () => {
      // 创建场景
      scene = new THREE.Scene();

      // 创建相机
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      // 创建渲染器
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      sceneRef?.current?.appendChild?.(renderer.domElement);

      // 创建立方体
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // 动画循环
      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      };

      animate();
    };

    init();

    return () => {
      // 在组件卸载时清除渲染器
      sceneRef?.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={sceneRef}></div>;
};

export default ThreeJSDemo;
