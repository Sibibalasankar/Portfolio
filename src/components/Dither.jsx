/* eslint-disable react/no-unknown-property */
import { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { EffectComposer, wrapEffect } from "@react-three/postprocessing";
import { Effect } from "postprocessing";
import * as THREE from "three";

/* ================= SHADER ================= */

const fragmentShader = `
uniform float time;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec2 mousePos;
uniform float mouseRadius;
uniform int enableMouseInteraction;
uniform int colorNum;

float dither(vec2 uv) {
  return fract(sin(dot(uv, vec2(12.9898,78.233))) * 43758.5453);
}

void mainUv(inout vec4 color, vec2 uv) {
  float wave =
    sin((uv.x + time * waveSpeed) * waveFrequency) *
    cos((uv.y + time * waveSpeed) * waveFrequency) *
    waveAmplitude;

  if (enableMouseInteraction == 1) {
    float dist = distance(uv, mousePos);
    wave += smoothstep(mouseRadius, 0.0, dist) * waveAmplitude;
  }

  float noise = dither(uv + wave);
  float level = floor(noise * float(colorNum)) / float(colorNum);

  color.rgb = waveColor * level;
}
`;

/* ================= EFFECT ================= */

class DitherEffectImpl extends Effect {
  constructor(props) {
    super("DitherEffect", fragmentShader, {
      uniforms: new Map([
        ["time", { value: 0 }],
        ["waveSpeed", { value: props.waveSpeed }],
        ["waveFrequency", { value: props.waveFrequency }],
        ["waveAmplitude", { value: props.waveAmplitude }],
        ["waveColor", { value: new THREE.Vector3(...props.waveColor) }],
        ["mousePos", { value: new THREE.Vector2(0.5, 0.5) }],
        ["mouseRadius", { value: props.mouseRadius }],
        ["enableMouseInteraction", { value: props.enableMouseInteraction ? 1 : 0 }],
        ["colorNum", { value: props.colorNum }],
      ]),
    });

    this.props = props;
  }

  update(_, __, deltaTime) {
    this.uniforms.get("time").value += deltaTime;
  }
}

const DitherEffect = wrapEffect(DitherEffectImpl);

/* ================= SCENE ================= */

function DitherScene(props) {
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));

  useEffect(() => {
    const move = (e) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <EffectComposer>
      <DitherEffect {...props} mousePos={mouse.current} />
    </EffectComposer>
  );
}

/* ================= EXPORT ================= */

export default function Dither({
  waveColor = [0.45, 0.45, 0.45],
  enableMouseInteraction = true,
  mouseRadius = 0.35,
  colorNum = 4,
  waveAmplitude = 0.25,
  waveFrequency = 3,
  waveSpeed = 0.05,
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 1] }}
      gl={{ antialias: false }}
    >
      <DitherScene
        waveColor={waveColor}
        enableMouseInteraction={enableMouseInteraction}
        mouseRadius={mouseRadius}
        colorNum={colorNum}
        waveAmplitude={waveAmplitude}
        waveFrequency={waveFrequency}
        waveSpeed={waveSpeed}
      />
    </Canvas>
  );
}
