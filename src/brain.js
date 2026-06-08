import * as THREE from 'three';

export function initBrain() {
  const canvas = document.getElementById('brainCanvas');
  if (!canvas) return () => {};

  const container = canvas.parentElement;
  const W = () => container.offsetWidth;
  const H = () => container.offsetHeight;

  /* --- Renderer --- */
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(W(), H());
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  /* --- Scene + Camera --- */
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W() / H(), 0.1, 100);
  camera.position.set(0, 0, 8);

  /* --- Lights --- */
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const keyLight = new THREE.DirectionalLight(0xffffff, 0.5);
  keyLight.position.set(3, 4, 5);
  scene.add(keyLight);

  /* ==========================================
     PROCEDURAL MRI SLICE TEXTURE GENERATOR (VECTOR-BASED)
     ========================================== */

  // Simple 2D Perlin-like noise
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  const rng = mulberry32(42);

  function smoothNoise(x, y, freq, seed) {
    const s = seed || 0;
    const sx = Math.floor(x * freq);
    const sy = Math.floor(y * freq);
    const fx = (x * freq) - sx;
    const fy = (y * freq) - sy;
    const sx1 = sx + 1, sy1 = sy + 1;
    const u = fx * fx * (3 - 2 * fx);
    const v = fy * fy * (3 - 2 * fy);
    const h = (a, b) => {
      const n = Math.sin(a * 12.9898 + b * 78.233 + s) * 43758.5453;
      return n - Math.floor(n);
    };
    const n00 = h(sx, sy), n10 = h(sx1, sy);
    const n01 = h(sx, sy1), n11 = h(sx1, sy1);
    return (n00 * (1 - u) + n10 * u) * (1 - v) +
           (n01 * (1 - u) + n11 * u) * v;
  }

  function fbm(x, y, octaves, seed) {
    let val = 0, amp = 0.5, freq = 1;
    for (let i = 0; i < octaves; i++) {
      val += amp * smoothNoise(x, y, freq, seed + i * 100);
      amp *= 0.5;
      freq *= 2.0;
    }
    return val;
  }

  /**
   * Generate one axial brain MRI slice as a canvas using vectors + telemetry.
   * @param {number} sliceIndex - 0..numSlices-1
   * @param {number} numSlices - total slices
   * @param {number} texSize - texture resolution
   * @returns {HTMLCanvasElement}
   */
  function generateMRISlice(sliceIndex, numSlices, texSize) {
    const canvas = document.createElement('canvas');
    canvas.width = texSize;
    canvas.height = texSize;
    const ctx = canvas.getContext('2d');
    
    // Clear background
    ctx.clearRect(0, 0, texSize, texSize);
    
    const t = sliceIndex / (numSlices - 1); // 0=top, 1=bottom
    const cx = texSize / 2;
    const cy = texSize / 2;

    // Calculate dimensions based on vertical slice index
    const rx = texSize * (0.33 + 0.07 * Math.sin(t * Math.PI));
    const ry = texSize * (0.28 + 0.09 * Math.sin(t * Math.PI * 0.8));

    // Scalp ring (outer boundary)
    ctx.strokeStyle = 'rgba(20, 168, 174, 0.16)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx * 1.08, ry * 1.08, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Skull bone (middle boundary)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx * 1.03, ry * 1.03, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Gray matter (convoluted outer brain)
    const steps = 180;
    ctx.beginPath();
    for (let k = 0; k <= steps; k++) {
      const angle = (k / steps) * Math.PI * 2;
      const cost = Math.cos(angle);
      const sint = Math.sin(angle);
      const baseR = (rx * ry) / Math.sqrt((ry * cost) ** 2 + (rx * sint) ** 2);

      // Longitudinal fissure indentation at midline (X ~ 0)
      let indent = 1.0;
      const midlineDist = Math.abs(cost);
      if (midlineDist < 0.18) {
        indent = 0.84 + 0.16 * (midlineDist / 0.18);
      }

      // Convolutions (gyri/sulci modulation)
      const freq1 = 14;
      const freq2 = 28;
      const wave = Math.sin(angle * freq1) * 3.0 + 
                   Math.cos(angle * freq2) * 1.2;

      const r = baseR * indent + wave;
      const px = cx + cost * r;
      const py = cy + sint * r;
      if (k === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(10, 42, 58, 0.75)'; // Dark clinical tissue base
    ctx.fill();
    ctx.strokeStyle = 'rgba(20, 168, 174, 0.42)'; // Teal cortex outline
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // White matter (brighter convoluted core)
    ctx.beginPath();
    for (let k = 0; k <= steps; k++) {
      const angle = (k / steps) * Math.PI * 2;
      const cost = Math.cos(angle);
      const sint = Math.sin(angle);
      const baseR = (rx * ry) / Math.sqrt((ry * cost) ** 2 + (rx * sint) ** 2);

      let indent = 1.0;
      const midlineDist = Math.abs(cost);
      if (midlineDist < 0.20) {
        indent = 0.8 + 0.2 * (midlineDist / 0.20);
      }

      const wave = Math.sin(angle * 10) * 3.5 + 
                   Math.cos(angle * 20) * 1.5;

      const r = baseR * 0.74 * indent + wave;
      const px = cx + cost * r;
      const py = cy + sint * r;
      if (k === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(20, 168, 174, 0.25)'; // Bright white-matter teal
    ctx.fill();
    ctx.strokeStyle = 'rgba(20, 168, 174, 0.12)';
    ctx.stroke();

    // Ventricles (dark butterfly shapes in the center)
    if (t > 0.25 && t < 0.72) {
      const ventScale = Math.sin((t - 0.25) / 0.47 * Math.PI);
      
      // Left ventricle horn
      ctx.beginPath();
      ctx.ellipse(cx - rx * 0.12, cy, rx * 0.05 * ventScale, ry * 0.12 * ventScale, -Math.PI / 12, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(4, 15, 25, 0.95)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(20, 168, 174, 0.18)';
      ctx.stroke();

      // Right ventricle horn
      ctx.beginPath();
      ctx.ellipse(cx + rx * 0.12, cy, rx * 0.05 * ventScale, ry * 0.12 * ventScale, Math.PI / 12, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(4, 15, 25, 0.95)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(20, 168, 174, 0.18)';
      ctx.stroke();
    }

    // Hippocampus Grad-CAM Heatmap overlay (middle-lower slices)
    if (t > 0.45 && t < 0.75) {
      const camIntensity = Math.sin((t - 0.45) / 0.3 * Math.PI);
      const drawGradCamSpot = (hx, hy) => {
        const grad = ctx.createRadialGradient(hx, hy, 0, hx, hy, rx * 0.16);
        grad.addColorStop(0, `rgba(235, 94, 40, ${0.85 * camIntensity})`);
        grad.addColorStop(0.3, `rgba(235, 94, 40, ${0.45 * camIntensity})`);
        grad.addColorStop(0.6, `rgba(200, 50, 20, ${0.18 * camIntensity})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(hx, hy, rx * 0.16, 0, Math.PI * 2);
        ctx.fill();
      };
      
      drawGradCamSpot(cx - rx * 0.22, cy + ry * 0.1); // Left hippocampal area
      drawGradCamSpot(cx + rx * 0.22, cy + ry * 0.1); // Right hippocampal area
    }

    // Central crosshair
    ctx.strokeStyle = 'rgba(20, 168, 174, 0.12)';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(cx - 12, cy); ctx.lineTo(cx + 12, cy);
    ctx.moveTo(cx, cy - 12); ctx.lineTo(cx, cy + 12);
    ctx.stroke();

    // Corner brackets
    const offset = 8;
    const len = 6;
    ctx.strokeStyle = 'rgba(20, 168, 174, 0.22)';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    // Top-Left
    ctx.moveTo(offset, offset + len); ctx.lineTo(offset, offset); ctx.lineTo(offset + len, offset);
    // Top-Right
    ctx.moveTo(texSize - offset - len, offset); ctx.lineTo(texSize - offset, offset); ctx.lineTo(texSize - offset, offset + len);
    // Bottom-Left
    ctx.moveTo(offset, texSize - offset - len); ctx.lineTo(offset, texSize - offset); ctx.lineTo(offset + len, texSize - offset);
    // Bottom-Right
    ctx.moveTo(texSize - offset - len, texSize - offset); ctx.lineTo(texSize - offset, texSize - offset); ctx.lineTo(texSize - offset, texSize - offset - len);
    ctx.stroke();

    // Medical Readout Text
    ctx.fillStyle = 'rgba(20, 168, 174, 0.5)';
    ctx.font = '700 8.5px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('PATIENT: ND-2026-MOB', offset + 4, offset + 13);
    ctx.fillText('SEQ: T1-SPGR-3D', offset + 4, offset + 22);
    ctx.fillText(`FOV: ${Math.round(rx*2)}x${Math.round(ry*2)}`, offset + 4, offset + 31);

    ctx.textAlign = 'right';
    ctx.fillText(`AXIAL ${sliceIndex + 1}/${numSlices}`, texSize - offset - 4, offset + 13);
    ctx.fillText('TR/TE: 8.2/3.2 ms', texSize - offset - 4, offset + 22);
    ctx.fillText('THK: 1.0 mm', texSize - offset - 4, offset + 31);

    if (t > 0.45 && t < 0.75) {
      ctx.fillStyle = 'rgba(235, 94, 40, 0.85)';
      ctx.fillText('GRAD-CAM ATTN: 0.924', texSize - offset - 4, texSize - offset - 4);
    }

    return canvas;
  }

  /* ==========================================
     GENERATE PARTICLE SOFT RADIUS TEXTURE
     ========================================== */
  function createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, 'rgba(20, 168, 174, 0.7)');
    grad.addColorStop(0.6, 'rgba(20, 168, 174, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(canvas);
  }

  /* ==========================================
     BUILD BRAIN VOLUME FROM SLICES
     ========================================== */

  const NUM_SLICES = 18;
  const TEX_SIZE = 256;
  const SLICE_SPACING = 0.18;
  const SLICE_WIDTH = 3.2;
  const brainGroup = new THREE.Group();
  scene.add(brainGroup);

  const sliceMaterials = [];
  const sliceMeshes = [];

  for (let i = 0; i < NUM_SLICES; i++) {
    const sliceCanvas = generateMRISlice(i, NUM_SLICES, TEX_SIZE);
    const texture = new THREE.CanvasTexture(sliceCanvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const z = (i - (NUM_SLICES - 1) / 2) * SLICE_SPACING;

    const geo = new THREE.PlaneGeometry(SLICE_WIDTH, SLICE_WIDTH);
    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.z = z;
    mesh.renderOrder = i;
    brainGroup.add(mesh);
    sliceMaterials.push(mat);
    sliceMeshes.push(mesh);
  }

  /* ==========================================
     BRAIN OUTLINE SILHOUETTE & HOLOGRAPHIC POINTS
     ========================================== */

  // Create a smooth brain-shaped silhouette using a deformed sphere
  const outlineGeo = new THREE.SphereGeometry(1.65, 48, 36);

  // Deform into brain shape
  const outPositions = outlineGeo.attributes.position;
  for (let i = 0; i < outPositions.count; i++) {
    let x = outPositions.getX(i);
    let y = outPositions.getY(i);
    let z = outPositions.getZ(i);

    // Flatten top slightly, widen middle
    const lat = Math.atan2(Math.sqrt(x * x + z * z), y);
    const lon = Math.atan2(z, x);

    // Brain is wider in X, compressed in Z (anterior-posterior)
    let rx = 1.0;
    let ry = 1.0;
    let rz = 0.85;

    // Add longitudinal fissure (sulcus down the middle)
    const fissureFactor = Math.exp(-Math.pow(x * 3, 4)) * 0.08;
    const sagittalFissure = fissureFactor * Math.cos(lat * 2);

    // Gyri/sulci texture
    const gyri = fbm(
      (lon + Math.PI) / (Math.PI * 2),
      lat / Math.PI,
      3, 99
    ) * 0.06;

    // Lateral fissure indent
    const lateralFissure = Math.exp(-Math.pow((y + 0.2) * 4, 2)) *
      Math.exp(-Math.pow(z * 3, 2)) * 0.1;

    const scale = 1 + gyri - sagittalFissure - lateralFissure;

    outPositions.setXYZ(i,
      x * rx * scale * SLICE_WIDTH * 0.52,
      y * ry * scale * SLICE_WIDTH * 0.52,
      z * rz * scale * SLICE_WIDTH * 0.52
    );
  }
  outlineGeo.computeVertexNormals();

  // Mesh outline
  const outlineMat = new THREE.MeshPhongMaterial({
    color: 0x0d7377,
    emissive: 0x0d7377,
    emissiveIntensity: 0.15,
    transparent: true,
    opacity: 0.08,
    wireframe: false,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const outlineMesh = new THREE.Mesh(outlineGeo, outlineMat);
  brainGroup.add(outlineMesh);

  // Wireframe outline for tech look
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x14a8ae,
    wireframe: true,
    transparent: true,
    opacity: 0.03,
    depthWrite: false,
  });
  const wireMesh = new THREE.Mesh(outlineGeo.clone(), wireMat);
  wireMesh.scale.setScalar(1.01);
  brainGroup.add(wireMesh);

  // Holographic Point Cloud Synaptic Network (glowing particle vertices)
  const particleMap = createParticleTexture();
  const pointCloudMat = new THREE.PointsMaterial({
    color: 0x14a8ae,
    size: 0.11,
    map: particleMap,
    transparent: true,
    opacity: 0.28,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const pointCloud = new THREE.Points(outlineGeo.clone(), pointCloudMat);
  brainGroup.add(pointCloud);

  /* ==========================================
     NEURAL SIGNAL SPARKS (Synaptic pathways)
     ========================================== */
  const curves = [];
  const sparkMeshes = [];
  const NUM_SPARKS = 8;

  // Function to get random coordinates constrained to brain shape
  const getBrainSurfacePoint = () => {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const r = 1.2 + Math.random() * 0.3; // distribution on shell
    const x = r * Math.sin(phi) * Math.cos(theta) * SLICE_WIDTH * 0.52;
    const y = r * Math.cos(phi) * SLICE_WIDTH * 0.52;
    const z = r * Math.sin(phi) * Math.sin(theta) * 0.85 * SLICE_WIDTH * 0.52;
    return new THREE.Vector3(x, y, z);
  };

  for (let i = 0; i < NUM_SPARKS; i++) {
    const pStart = getBrainSurfacePoint();
    const pEnd = getBrainSurfacePoint();
    // Intermediate control point curved slightly outwards
    const pMid = new THREE.Vector3().addVectors(pStart, pEnd).multiplyScalar(0.5);
    pMid.add(new THREE.Vector3(
      (Math.random() - 0.5) * 0.9,
      (Math.random() - 0.5) * 0.9,
      (Math.random() - 0.5) * 0.9
    ));

    const curve = new THREE.QuadraticBezierCurve3(pStart, pMid, pEnd);
    curves.push(curve);

    // Draw the neural path line
    const points = curve.getPoints(24);
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x14a8ae,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
    });
    const line = new THREE.Line(lineGeo, lineMat);
    brainGroup.add(line);

    // Spark element (small warm yellow neural signal)
    const sparkGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const sparkMat = new THREE.MeshBasicMaterial({
      color: 0xffdd59, // Warm contrasting yellow-orange
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const sparkMesh = new THREE.Mesh(sparkGeo, sparkMat);
    brainGroup.add(sparkMesh);
    
    sparkMeshes.push({
      mesh: sparkMesh,
      curve: curve,
      progress: Math.random(), // start at random timeline
      speed: 0.2 + Math.random() * 0.25,
    });
  }

  /* ==========================================
     HUD CALIBRATION ELEMENTS (Rotating Rings & 3D Bounding Box)
     ========================================== */

  const ringGroup = new THREE.Group();
  brainGroup.add(ringGroup);

  // Concentric horizontal scan rings
  const ringGeo1 = new THREE.RingGeometry(2.4, 2.415, 64);
  const ringMat1 = new THREE.LineBasicMaterial({ color: 0x14a8ae, transparent: true, opacity: 0.12, side: THREE.DoubleSide, depthWrite: false });
  const ring1 = new THREE.LineLoop(ringGeo1, ringMat1);
  ring1.rotation.x = Math.PI / 2;
  ringGroup.add(ring1);

  const ringGeo2 = new THREE.RingGeometry(2.8, 2.81, 64);
  const ringMat2 = new THREE.LineBasicMaterial({ color: 0x14a8ae, transparent: true, opacity: 0.06, side: THREE.DoubleSide, depthWrite: false });
  const ring2 = new THREE.LineLoop(ringGeo2, ringMat2);
  ring2.rotation.x = Math.PI / 2;
  ringGroup.add(ring2);

  const ringGeo3 = new THREE.RingGeometry(2.6, 2.61, 64);
  const ringMat3 = new THREE.LineBasicMaterial({ color: 0x14a8ae, transparent: true, opacity: 0.04, side: THREE.DoubleSide, depthWrite: false });
  const ring3 = new THREE.LineLoop(ringGeo3, ringMat3);
  ring3.rotation.y = Math.PI / 2;
  ringGroup.add(ring3);

  // 3D Corner bracket bounding box
  const boxSize = 3.6;
  const hSize = boxSize / 2;
  const bracketLen = 0.45;
  const bracketsGeo = new THREE.BufferGeometry();
  const bracketPoints = [];

  const corners = [
    [-1, -1, -1], [1, -1, -1], [-1, 1, -1], [1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1]
  ];

  corners.forEach(([cx, cy, cz]) => {
    const x = cx * hSize;
    const y = cy * hSize;
    const z = cz * hSize;

    // Line segments parallel to X, Y, Z axes
    bracketPoints.push(new THREE.Vector3(x, y, z), new THREE.Vector3(x - cx * bracketLen, y, z));
    bracketPoints.push(new THREE.Vector3(x, y, z), new THREE.Vector3(x, y - cy * bracketLen, z));
    bracketPoints.push(new THREE.Vector3(x, y, z), new THREE.Vector3(x, y, z - cz * bracketLen));
  });

  bracketsGeo.setFromPoints(bracketPoints);
  const bracketsMat = new THREE.LineBasicMaterial({
    color: 0x14a8ae,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
  });
  const brackets = new THREE.LineSegments(bracketsGeo, bracketsMat);
  brainGroup.add(brackets);

  /* ==========================================
     SCANNING HIGHLIGHT PLANE
     ========================================== */

  const scanGeo = new THREE.PlaneGeometry(SLICE_WIDTH * 1.05, SLICE_WIDTH * 1.05);
  const scanMat = new THREE.MeshBasicMaterial({
    color: 0x14a8ae,
    transparent: true,
    opacity: 0.0,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const scanPlane = new THREE.Mesh(scanGeo, scanMat);
  brainGroup.add(scanPlane);

  // Scan line (horizontal accent)
  const scanLineGeo = new THREE.PlaneGeometry(SLICE_WIDTH * 1.2, 0.015);
  const scanLineMat = new THREE.MeshBasicMaterial({
    color: 0x14a8ae,
    transparent: true,
    opacity: 0.0,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const scanLine = new THREE.Mesh(scanLineGeo, scanLineMat);
  brainGroup.add(scanLine);

  /* ==========================================
     FLOATING PARTICLES (ambient atmosphere)
     ========================================== */

  const PART_COUNT = 120;
  const partGeo = new THREE.BufferGeometry();
  const partPositions = new Float32Array(PART_COUNT * 3);
  const partSpeeds = [];
  for (let i = 0; i < PART_COUNT; i++) {
    partPositions[i * 3] = (rng() - 0.5) * 14;
    partPositions[i * 3 + 1] = (rng() - 0.5) * 9;
    partPositions[i * 3 + 2] = (rng() - 0.5) * 8;
    partSpeeds.push({
      x: (rng() - 0.5) * 0.003,
      y: (rng() - 0.5) * 0.002,
      z: (rng() - 0.5) * 0.001,
    });
  }
  partGeo.setAttribute('position', new THREE.BufferAttribute(partPositions, 3));
  const partMat = new THREE.PointsMaterial({
    color: 0x14a8ae,
    size: 0.035,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.4,
  });
  const particles = new THREE.Points(partGeo, partMat);
  scene.add(particles);

  /* ==========================================
     COORDINATE AXES (subtle reference lines)
     ========================================== */

  const axisLen = SLICE_WIDTH * 0.55;
  const axisGeo = new THREE.BufferGeometry();
  axisGeo.setAttribute('position', new THREE.Float32BufferAttribute([
    -axisLen, 0, 0, axisLen, 0, 0,
    0, -axisLen, 0, 0, axisLen, 0,
    0, 0, -axisLen * 0.8, 0, 0, axisLen * 0.8,
  ], 3));
  const axisMat = new THREE.LineBasicMaterial({
    color: 0x14a8ae,
    transparent: true,
    opacity: 0.08,
  });
  const axes = new THREE.LineSegments(axisGeo, axisMat);
  brainGroup.add(axes);

  /* ==========================================
     MOUSE & TOUCH INTERACTION (drag rotate + damping)
     ========================================== */

  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let targetRotationX = -0.15;
  let targetRotationY = 0.0;
  
  // Ambient screen-space hover tracker
  let hoverX = 0, hoverY = 0;
  const onMouseMove = (e) => {
    if (!isDragging) {
      hoverX = (e.clientX / window.innerWidth - 0.5) * 0.35;
      hoverY = (e.clientY / window.innerHeight - 0.5) * 0.25;
    }
  };
  document.addEventListener('mousemove', onMouseMove);

  // Mouse drag listeners
  const onMouseDown = (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  };
  canvas.addEventListener('mousedown', onMouseDown);

  const onWindowMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      
      targetRotationY += deltaX * 0.005;
      targetRotationX += deltaY * 0.005;
      // Clamp vertical rotation
      targetRotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationX));
      
      previousMousePosition = { x: e.clientX, y: e.clientY };
    }
  };
  window.addEventListener('mousemove', onWindowMouseMove);

  const onMouseUp = () => {
    isDragging = false;
  };
  window.addEventListener('mouseup', onMouseUp);

  // Touch drag support
  const onTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };
  canvas.addEventListener('touchstart', onTouchStart, { passive: true });

  const onTouchMove = (e) => {
    if (isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;
      
      targetRotationY += deltaX * 0.005;
      targetRotationX += deltaY * 0.005;
      targetRotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationX));
      
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };
  canvas.addEventListener('touchmove', onTouchMove, { passive: true });

  const onTouchEnd = () => {
    isDragging = false;
  };
  canvas.addEventListener('touchend', onTouchEnd);

  /* ==========================================
     ANIMATION LOOP (delta-time)
     ========================================== */

  const clock = new THREE.Clock();
  let currentScanSlice = 0;
  let animationFrameId;

  function tick() {
    animationFrameId = requestAnimationFrame(tick);
    const delta = clock.getDelta();
    const t = clock.getElapsedTime();

    // Constant slow rotation drift + cursor hover offsets + drag coordinate overrides
    const autoRotY = t * 0.05;
    const destRotY = targetRotationY + autoRotY + hoverX;
    const destRotX = targetRotationX + hoverY;

    // Smooth interpolations (inertial damping)
    brainGroup.rotation.y += (destRotY - brainGroup.rotation.y) * 0.08;
    brainGroup.rotation.x += (destRotX - brainGroup.rotation.x) * 0.08;

    // Scanning animation — sweep through slices
    const scanSpeed = 0.35;
    const scanT = (t * scanSpeed) % 2; // 0→2 cycles back and forth
    const scanProgress = scanT < 1 ? scanT : 2 - scanT; // ping-pong
    currentScanSlice = scanProgress * (NUM_SLICES - 1);

    // Update slice opacities based on scan position
    for (let i = 0; i < NUM_SLICES; i++) {
      const dist = Math.abs(i - currentScanSlice);
      const baseOpacity = 0.15 + 0.7 * Math.exp(-dist * 0.4);
      const isNearScan = dist < 2.0;
      const pulse = isNearScan ? Math.sin(t * 4 - dist * 1.5) * 0.1 : 0;
      sliceMaterials[i].opacity = Math.max(0.08, Math.min(1, baseOpacity + pulse));
    }

    // Neural Signal Sparks path progression
    sparkMeshes.forEach(s => {
      s.progress += s.speed * delta;
      if (s.progress > 1.0) {
        s.progress = 0.0;
        s.speed = 0.2 + Math.random() * 0.25; // randomize speed on loop
      }
      const sparkPos = s.curve.getPointAt(s.progress);
      s.mesh.position.copy(sparkPos);
    });

    // Spin calibration rings at different slow speeds
    ring1.rotation.z = t * 0.04;
    ring2.rotation.z = -t * 0.06;
    ring3.rotation.z = t * 0.02;

    // Scan plane position
    const scanZ = (currentScanSlice - (NUM_SLICES - 1) / 2) * SLICE_SPACING;
    scanPlane.position.z = scanZ;
    scanMat.opacity = 0.08 + Math.sin(t * 3) * 0.04;

    // Scan line
    scanLine.position.z = scanZ;
    scanLine.position.y = (Math.sin(t * 2.5) * 0.5) * SLICE_WIDTH * 0.5;
    scanLineMat.opacity = 0.35 + Math.sin(t * 5) * 0.15;

    // Outline breathing animation
    const bScale = 1 + Math.sin(t * 0.8) * 0.015;
    outlineMesh.scale.setScalar(bScale);
    wireMesh.scale.setScalar(bScale * 1.01);
    pointCloud.scale.setScalar(bScale);
    outlineMat.opacity = 0.08 + Math.sin(t * 0.8) * 0.04;

    // Background particle drift
    const pPos = partGeo.attributes.position.array;
    for (let i = 0; i < PART_COUNT; i++) {
      pPos[i * 3] += partSpeeds[i].x + Math.sin(t * 0.2 + i) * 0.0003;
      pPos[i * 3 + 1] += partSpeeds[i].y + Math.cos(t * 0.15 + i * 0.5) * 0.0002;
      pPos[i * 3 + 2] += partSpeeds[i].z;
      
      // Wrap particles around borders
      if (pPos[i * 3] > 7) pPos[i * 3] = -7;
      if (pPos[i * 3] < -7) pPos[i * 3] = 7;
      if (pPos[i * 3 + 1] > 4.5) pPos[i * 3 + 1] = -4.5;
      if (pPos[i * 3 + 1] < -4.5) pPos[i * 3 + 1] = 4.5;
    }
    partGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  tick();

  /* --- Resize --- */
  let resizeTimeout;
  const onResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      renderer.setSize(W(), H());
      camera.aspect = W() / H();
      camera.updateProjectionMatrix();
    }, 100);
  };
  window.addEventListener('resize', onResize);

  /* --- Cleanup function --- */
  return function cleanup() {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('mousemove', onWindowMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
    canvas.removeEventListener('mousedown', onMouseDown);
    canvas.removeEventListener('touchstart', onTouchStart);
    canvas.removeEventListener('touchmove', onTouchMove);
    canvas.removeEventListener('touchend', onTouchEnd);
    renderer.dispose();
    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
  };
}
