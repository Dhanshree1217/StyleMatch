/**
 * AvatarViewer — Customizable 3D avatar using React Three Fiber.
 *
 * IMPORTANT: This avatar is a GENERIC, NON-PHOTOREALISTIC 3D figure.
 * It is NOT built from the user's photograph. No photo data is used as a texture.
 * The avatar is customized only via user-selected preferences (skin tone, hair color, etc.).
 *
 * This is a visual approximation suitable for fashion previews, not an exact digital replica.
 * Accurate garment fitting / cloth simulation requires dedicated 3D garment assets.
 */
import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { AlertCircle, RotateCcw } from 'lucide-react';

// Skin tone hex map
const SKIN_HEX = {
  Fair: '#FDDBB4', Light: '#F5C5A3', Medium: '#D4956A', Tan: '#B07850', Deep: '#6B3F2A',
};
const HAIR_HEX = {
  Black: '#1a1a1a', 'Dark Brown': '#3B1F0A', 'Light Brown': '#8B5E3C',
  Blonde: '#F5DEB3', Red: '#B22222', Grey: '#9E9E9E', White: '#F5F5F5',
};

// Clothing color map for outfit preview on avatar
const OUTFIT_COLORS = {
  top: '#F9A8D4',
  bottom: '#1D4ED8',
  shoes: '#1F2937',
};

function AvatarMesh({ skinColor, hairColor, topColor, bottomColor, shoeColor, hairLength }) {
  const groupRef = useRef();
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.15;
  });

  const skin = skinColor || '#D4956A';
  const hair = hairColor || '#1a1a1a';
  const top = topColor || '#F9A8D4';
  const bottom = bottomColor || '#1D4ED8';
  const shoe = shoeColor || '#1F2937';
  const hairH = hairLength === 'Long' ? 0.38 : hairLength === 'Medium' ? 0.22 : 0.08;

  return (
    <group ref={groupRef} position={[0, -1.1, 0]}>
      {/* Legs */}
      <mesh position={[-0.18, 0.42, 0]}>
        <cylinderGeometry args={[0.1, 0.09, 0.84, 16]} />
        <meshStandardMaterial color={bottom} roughness={0.7} />
      </mesh>
      <mesh position={[0.18, 0.42, 0]}>
        <cylinderGeometry args={[0.1, 0.09, 0.84, 16]} />
        <meshStandardMaterial color={bottom} roughness={0.7} />
      </mesh>
      {/* Shoes */}
      <mesh position={[-0.18, 0.02, 0.06]}>
        <boxGeometry args={[0.18, 0.1, 0.28]} />
        <meshStandardMaterial color={shoe} roughness={0.5} />
      </mesh>
      <mesh position={[0.18, 0.02, 0.06]}>
        <boxGeometry args={[0.18, 0.1, 0.28]} />
        <meshStandardMaterial color={shoe} roughness={0.5} />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 1.08, 0]}>
        <cylinderGeometry args={[0.26, 0.22, 0.62, 16]} />
        <meshStandardMaterial color={top} roughness={0.6} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.42, 1.08, 0]} rotation={[0, 0, 0.18]}>
        <cylinderGeometry args={[0.08, 0.07, 0.58, 12]} />
        <meshStandardMaterial color={top} roughness={0.6} />
      </mesh>
      <mesh position={[0.42, 1.08, 0]} rotation={[0, 0, -0.18]}>
        <cylinderGeometry args={[0.08, 0.07, 0.58, 12]} />
        <meshStandardMaterial color={top} roughness={0.6} />
      </mesh>
      {/* Hands */}
      <mesh position={[-0.48, 0.82, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color={skin} roughness={0.5} />
      </mesh>
      <mesh position={[0.48, 0.82, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color={skin} roughness={0.5} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.46, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.18, 12]} />
        <meshStandardMaterial color={skin} roughness={0.5} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.72, 0]}>
        <sphereGeometry args={[0.24, 24, 24]} />
        <meshStandardMaterial color={skin} roughness={0.4} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.09, 1.76, 0.22]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.09, 1.76, 0.22]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Hair */}
      <mesh position={[0, 1.88 + hairH / 2, 0]}>
        <cylinderGeometry args={[0.245, 0.245, hairH + 0.06, 20]} />
        <meshStandardMaterial color={hair} roughness={0.8} />
      </mesh>
      {hairLength === 'Long' && (
        <mesh position={[0, 1.62, -0.18]}>
          <boxGeometry args={[0.44, 0.52, 0.08]} />
          <meshStandardMaterial color={hair} roughness={0.8} />
        </mesh>
      )}
      {hairLength === 'Medium' && (
        <mesh position={[0, 1.66, -0.14]}>
          <boxGeometry args={[0.44, 0.28, 0.08]} />
          <meshStandardMaterial color={hair} roughness={0.8} />
        </mesh>
      )}
    </group>
  );
}

function AvatarScene({ prefs, selectedTop, selectedBottom, selectedShoe }) {
  const skinColor = SKIN_HEX[prefs?.skinTone] || '#D4956A';
  const hairColor = HAIR_HEX[prefs?.hairColor] || '#1a1a1a';
  const topColor = selectedTop?.color || OUTFIT_COLORS.top;
  const bottomColor = selectedBottom?.color || OUTFIT_COLORS.bottom;
  const shoeColor = selectedShoe?.color || OUTFIT_COLORS.shoes;

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 3]} intensity={1.2} castShadow />
      <directionalLight position={[-3, 3, -2]} intensity={0.4} />
      <Environment preset="city" />
      <ContactShadows position={[0, -2.2, 0]} opacity={0.3} scale={4} blur={2} />
      <AvatarMesh
        skinColor={skinColor}
        hairColor={hairColor}
        topColor={topColor}
        bottomColor={bottomColor}
        shoeColor={shoeColor}
        hairLength={prefs?.hairLength || 'Medium'}
      />
      <OrbitControls
        enablePan={false}
        minDistance={2.5}
        maxDistance={7}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
}

function WebGLFallback() {
  return (
    <div className="avatar-fallback">
      <AlertCircle size={40} />
      <h4>3D Preview Unavailable</h4>
      <p>WebGL is not supported or is disabled in your browser. Please enable hardware acceleration or try a different browser to view the 3D avatar.</p>
    </div>
  );
}

export default function AvatarViewer({ prefs, selectedTop, selectedBottom, selectedShoe, onResetCamera }) {
  const [webglFailed, setWebglFailed] = useState(false);
  const controlsRef = useRef();

  const resetCamera = () => {
    if (controlsRef.current) controlsRef.current.reset();
    if (onResetCamera) onResetCamera();
  };

  if (webglFailed) return <WebGLFallback />;

  return (
    <div className="avatar-viewer">
      <div className="avatar-canvas-wrap">
        <Suspense fallback={<div className="avatar-loading"><div className="avatar-spinner" /><p>Loading 3D Avatar...</p></div>}>
          <Canvas
            camera={{ position: [0, 0.5, 4.5], fov: 45 }}
            shadows
            onCreated={({ gl }) => {
              if (!gl) setWebglFailed(true);
            }}
            style={{ background: 'linear-gradient(180deg, #faf5ff 0%, #fce7f3 100%)' }}
          >
            <AvatarScene
              prefs={prefs}
              selectedTop={selectedTop}
              selectedBottom={selectedBottom}
              selectedShoe={selectedShoe}
            />
          </Canvas>
        </Suspense>
      </div>

      <div className="avatar-controls-bar">
        <button className="avatar-ctrl-btn" onClick={resetCamera} title="Reset camera">
          <RotateCcw size={15} /> Reset View
        </button>
        <span className="avatar-hint">Drag to rotate · Scroll to zoom</span>
      </div>

      <div className="avatar-disclaimer">
        ⚠️ This is a generic, non-photorealistic avatar for visual approximation only. It is not an exact replica of the user. No personal photo is used as a texture.
      </div>
    </div>
  );
}
