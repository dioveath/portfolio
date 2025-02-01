import * as THREE from 'three';

export const CRTEffectShader = {
  uniforms: {
    tDiffuse: { value: null }, // Texture from the NES emulator
    resolution: { value: new THREE.Vector2(256, 240) }, // Screen resolution
    time: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    uniform float time;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // Screen curvature effect
      vec2 curve = uv - 0.5;
      curve *= vec2(1.1, 1.3); // Adjust curvature
      uv = 0.5 + curve * (1.0 - 0.1 * length(curve));

      // Scanline effect
      float scanline = sin(uv.y * resolution.y * 1.5) * 0.1;

      // Chromatic aberration
      float r = texture2D(tDiffuse, uv + vec2(0.002, 0.0)).r;
      float g = texture2D(tDiffuse, uv).g;
      float b = texture2D(tDiffuse, uv - vec2(0.002, 0.0)).b;

      vec3 color = vec3(r, g, b);
      color += scanline;

      // Vignette effect
      float vignette = smoothstep(0.8, 0.2, length(uv - 0.5));
      color *= vignette;

      gl_FragColor = vec4(color, 1.0);
    }
  `
};

