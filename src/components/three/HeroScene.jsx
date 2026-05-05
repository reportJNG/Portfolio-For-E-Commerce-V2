import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animationId;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0A0F1E, 0.035);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 22;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Particle Field ──────────────────────────────────
    const PARTICLE_COUNT = 260;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 55;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      velocities.push({
        x: (Math.random() - 0.5) * 0.018,
        y: (Math.random() - 0.5) * 0.018,
      });
    }

    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pointMat = new THREE.PointsMaterial({
      color: 0x60A5FA,
      size: 0.14,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pointGeo, pointMat);
    scene.add(points);

    // ── Network Lines (static mesh, updated each frame) ──
    const MAX_LINES = 400;
    const linePositions = new Float32Array(MAX_LINES * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setDrawRange(0, 0);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x2563EB,
      transparent: true,
      opacity: 0.18,
    });
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineSegments);

    // ── Wireframe Icosahedron ────────────────────────────
    const icoGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x1D4ED8,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(7, -1, -4);
    scene.add(ico);

    // ── Torus Ring ────────────────────────────────────────
    const torusGeo = new THREE.TorusGeometry(6.5, 0.06, 8, 120);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x3B82F6,
      transparent: true,
      opacity: 0.08,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI / 3;
    torus.position.set(-8, 2, -5);
    scene.add(torus);

    // ── Mouse Parallax ────────────────────────────────────
    let targetCamX = 0;
    let targetCamY = 0;
    let currentCamX = 0;
    let currentCamY = 0;

    const onMouseMove = (e) => {
      targetCamX = (e.clientX / window.innerWidth - 0.5) * 3.5;
      targetCamY = -(e.clientY / window.innerHeight - 0.5) * 2.5;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ── Animation Loop ─────────────────────────────────────
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Move particles
      const pos = pointGeo.attributes.position;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos.array[i * 3]     += velocities[i].x;
        pos.array[i * 3 + 1] += velocities[i].y;
        if (Math.abs(pos.array[i * 3])     > 27.5) velocities[i].x *= -1;
        if (Math.abs(pos.array[i * 3 + 1]) > 17.5) velocities[i].y *= -1;
      }
      pos.needsUpdate = true;

      // Update network lines
      let lineCount = 0;
      const lp = lineGeo.attributes.position.array;
      for (let i = 0; i < PARTICLE_COUNT && lineCount < MAX_LINES; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT && lineCount < MAX_LINES; j++) {
          const dx = pos.array[i * 3]     - pos.array[j * 3];
          const dy = pos.array[i * 3 + 1] - pos.array[j * 3 + 1];
          const dz = pos.array[i * 3 + 2] - pos.array[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 7) {
            lp[lineCount * 6]     = pos.array[i * 3];
            lp[lineCount * 6 + 1] = pos.array[i * 3 + 1];
            lp[lineCount * 6 + 2] = pos.array[i * 3 + 2];
            lp[lineCount * 6 + 3] = pos.array[j * 3];
            lp[lineCount * 6 + 4] = pos.array[j * 3 + 1];
            lp[lineCount * 6 + 5] = pos.array[j * 3 + 2];
            lineCount++;
          }
        }
      }
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.setDrawRange(0, lineCount * 2);

      // Rotate shapes
      ico.rotation.y = t * 0.12;
      ico.rotation.x = t * 0.08;
      torus.rotation.z = t * 0.06;
      torus.rotation.y = t * 0.04;

      // Smooth camera parallax
      currentCamX += (targetCamX - currentCamX) * 0.04;
      currentCamY += (targetCamY - currentCamY) * 0.04;
      camera.position.x = currentCamX;
      camera.position.y = currentCamY;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      pointGeo.dispose(); pointMat.dispose();
      lineGeo.dispose(); lineMat.dispose();
      icoGeo.dispose(); icoMat.dispose();
      torusGeo.dispose(); torusMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0"
      style={{ pointerEvents: 'none', zIndex: 0 }}
    />
  );
}
