/**
 * PhotoCapture — Upload or live-camera capture for avatar reference.
 *
 * PRIVACY POLICY (enforced in code):
 * - The captured/uploaded photo is held ONLY in a temporary React state (object URL or data URL).
 * - It is NEVER written to LocalStorage, SessionStorage, IndexedDB, cookies, or any server.
 * - The object URL is revoked via URL.revokeObjectURL() as soon as it is no longer needed.
 * - Camera streams are stopped (track.stop()) immediately on cancel, retake, or unmount.
 * - Calling onConfirm passes only a temporary in-memory reference; the parent must NOT persist it.
 * - Calling onRemove or onCancel clears all temporary data immediately.
 */
import { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, Upload, X, RotateCcw, Check, ShieldCheck, AlertCircle } from 'lucide-react';

export default function PhotoCapture({ onConfirm, onCancel }) {
  const [mode, setMode] = useState(null); // null | 'upload' | 'camera'
  const [preview, setPreview] = useState(null); // temporary object URL only
  const [cameraError, setCameraError] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [captured, setCaptured] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const objectUrlRef = useRef(null);

  // Stop camera and revoke any object URLs on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      revokePreview();
    };
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setStreaming(false);
  }, []);

  const revokePreview = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setPreview(null);
    setCaptured(false);
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setCameraError('Please select a valid image file.'); return; }
    revokePreview();
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setPreview(url);
    setMode('upload');
    setCaptured(true);
    e.target.value = '';
  };

  const startCamera = async () => {
    setCameraError('');
    setMode('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreaming(true);
      }
    } catch (err) {
      const msg = err.name === 'NotAllowedError'
        ? 'Camera permission denied. Please allow camera access in your browser settings.'
        : err.name === 'NotFoundError'
        ? 'No camera found on this device.'
        : 'Could not access camera. Make sure you are on HTTPS or localhost.';
      setCameraError(msg);
      setMode(null);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    stopCamera();
    // Use canvas.toBlob to create a temporary object URL (not persisted)
    canvas.toBlob((blob) => {
      revokePreview();
      const url = URL.createObjectURL(blob);
      objectUrlRef.current = url;
      setPreview(url);
      setCaptured(true);
      // Clear canvas immediately after creating the blob URL
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }, 'image/jpeg', 0.85);
  };

  const handleRetake = () => {
    revokePreview();
    setCaptured(false);
    if (mode === 'camera') startCamera();
    else setMode(null);
  };

  const handleRemove = () => {
    stopCamera();
    revokePreview();
    setMode(null);
    setCameraError('');
  };

  const handleConfirm = () => {
    // Pass only the temporary in-memory URL to parent.
    // Parent must NOT save this to any persistent storage.
    if (preview) onConfirm(preview);
  };

  const handleCancel = () => {
    stopCamera();
    revokePreview();
    onCancel();
  };

  return (
    <div className="photo-capture">
      {/* Privacy notice */}
      <div className="privacy-notice">
        <ShieldCheck size={16} />
        <div>
          <strong>Privacy Protected</strong>
          <p>Your photo is used only as a temporary in-memory reference to help customize your avatar. It is <strong>never saved</strong> to storage, sent to any server, or retained after you close this panel.</p>
        </div>
      </div>

      {cameraError && (
        <div className="alert alert-error">
          <AlertCircle size={16} /> {cameraError}
        </div>
      )}

      {/* Mode selection */}
      {!mode && (
        <div className="photo-options">
          <p className="photo-purpose">
            Optionally upload a reference photo to help set your avatar's proportions. This photo stays in your browser memory only.
          </p>
          <div className="photo-option-btns">
            <label className="photo-option-card">
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />
              <Upload size={28} />
              <strong>Upload Photo</strong>
              <span>Choose from your device</span>
            </label>
            <button className="photo-option-card" onClick={startCamera}>
              <Camera size={28} />
              <strong>Open Camera</strong>
              <span>Take a photo now</span>
            </button>
          </div>
        </div>
      )}

      {/* Camera view */}
      {mode === 'camera' && !captured && (
        <div className="camera-view">
          <video ref={videoRef} className="camera-video" playsInline muted autoPlay />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <div className="camera-controls">
            <button className="btn-outline" onClick={handleCancel}><X size={16} /> Cancel</button>
            {streaming && (
              <button className="btn-primary" onClick={capturePhoto}><Camera size={16} /> Capture</button>
            )}
          </div>
        </div>
      )}

      {/* Hidden canvas for camera capture */}
      {mode !== 'camera' && <canvas ref={canvasRef} style={{ display: 'none' }} />}

      {/* Preview */}
      {captured && preview && (
        <div className="photo-preview-wrap">
          <img src={preview} alt="Reference preview" className="photo-preview-img" />
          <div className="photo-preview-note">
            <ShieldCheck size={14} /> This preview exists only in browser memory and will be cleared when you close this panel.
          </div>
          <div className="photo-preview-actions">
            <button className="btn-outline" onClick={handleRetake}><RotateCcw size={15} /> Retake</button>
            <button className="btn-outline" onClick={handleRemove}><X size={15} /> Remove Photo</button>
            <button className="btn-primary" onClick={handleConfirm}><Check size={15} /> Use as Reference</button>
          </div>
        </div>
      )}

      {!mode && (
        <div className="photo-skip">
          <button className="btn-ghost" onClick={handleCancel}>Skip — use default avatar</button>
        </div>
      )}
    </div>
  );
}
