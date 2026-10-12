import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, User, Ruler, Palette, Sparkles } from 'lucide-react';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom'];
const BODY_SHAPES = ['Hourglass', 'Pear', 'Apple', 'Rectangle', 'Inverted Triangle', 'Prefer not to say'];
const SKIN_TONES = [
  { label: 'Fair', color: '#FDDBB4' },
  { label: 'Light', color: '#F5C5A3' },
  { label: 'Medium', color: '#D4956A' },
  { label: 'Tan', color: '#B07850' },
  { label: 'Deep', color: '#6B3F2A' },
];
const UNDERTONES = ['Warm', 'Cool', 'Neutral', 'Not Sure'];
const HAIR_COLORS = ['Black', 'Dark Brown', 'Light Brown', 'Blonde', 'Red', 'Grey', 'White'];
const HAIR_LENGTHS = ['Short', 'Medium', 'Long'];
const EYE_COLORS = ['Black', 'Dark Brown', 'Light Brown', 'Hazel', 'Green', 'Blue', 'Grey'];
const FASHION_STYLES = ['Minimal', 'Elegant', 'Trendy', 'Classic', 'Streetwear', 'Bohemian'];
const GENDERS = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];
const PALETTE_COLORS = ['#F9A8D4','#FBCFE8','#FDE68A','#A7F3D0','#BAE6FD','#C4B5FD','#FCA5A5','#6EE7B7','#93C5FD','#F0ABFC','#FFFFFF','#F5F5F4','#D6D3D1','#78716C','#1F2937','#DC2626','#D97706','#059669','#2563EB','#7C3AED'];

const STEPS = [
  { id: 'identity', label: 'Identity', icon: <User size={16} /> },
  { id: 'measurements', label: 'Measurements', icon: <Ruler size={16} /> },
  { id: 'appearance', label: 'Appearance', icon: <Palette size={16} /> },
  { id: 'style', label: 'Style', icon: <Sparkles size={16} /> },
];

const emptyPrefs = {
  gender: '', size: '', customSize: '', height: '', weight: '',
  chest: '', waist: '', hips: '', bodyShape: '',
  skinTone: '', undertone: '', hairColor: '', hairLength: '', eyeColor: '',
  preferredColors: [], fashionStyle: '',
};

export default function StylePreferencesForm({ initial, onSave, onCancel }) {
  const [step, setStep] = useState(0);
  const [prefs, setPrefs] = useState(initial || emptyPrefs);
  const [saved, setSaved] = useState(false);

  const set = (key, val) => setPrefs((p) => ({ ...p, [key]: val }));

  const toggleColor = (c) => {
    const cur = prefs.preferredColors;
    set('preferredColors', cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c]);
  };

  const handleSave = () => {
    onSave(prefs);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="prefs-wizard">
      {/* Step indicators */}
      <div className="prefs-steps">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            className={`prefs-step-btn ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
            onClick={() => setStep(i)}
          >
            <span className="prefs-step-icon">{i < step ? <Check size={14} /> : s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      <div className="prefs-body">
        {/* Step 0: Identity */}
        {step === 0 && (
          <div className="prefs-section">
            <h4>Gender / Clothing Preference</h4>
            <div className="chip-group">
              {GENDERS.map((g) => (
                <button key={g} className={`chip ${prefs.gender === g ? 'active' : ''}`} onClick={() => set('gender', g)}>{g}</button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Measurements */}
        {step === 1 && (
          <>
            <div className="prefs-section">
              <h4>Clothing Size</h4>
              <div className="chip-group">
                {SIZES.map((s) => (
                  <button key={s} className={`chip ${prefs.size === s ? 'active' : ''}`} onClick={() => set('size', s)}>{s}</button>
                ))}
              </div>
              {prefs.size === 'Custom' && (
                <input className="prefs-input" placeholder="e.g. 38-32-40" value={prefs.customSize} onChange={(e) => set('customSize', e.target.value)} />
              )}
            </div>
            <div className="prefs-section">
              <h4>Height & Body Measurements <span className="optional">(optional)</span></h4>
              <div className="prefs-grid-2">
                <div className="form-group">
                  <label>Height (cm)</label>
                  <input className="prefs-input" type="number" placeholder="e.g. 165" value={prefs.height} onChange={(e) => set('height', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Weight (kg)</label>
                  <input className="prefs-input" type="number" placeholder="e.g. 60" value={prefs.weight} onChange={(e) => set('weight', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Chest (cm)</label>
                  <input className="prefs-input" type="number" placeholder="e.g. 88" value={prefs.chest} onChange={(e) => set('chest', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Waist (cm)</label>
                  <input className="prefs-input" type="number" placeholder="e.g. 70" value={prefs.waist} onChange={(e) => set('waist', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Hips (cm)</label>
                  <input className="prefs-input" type="number" placeholder="e.g. 94" value={prefs.hips} onChange={(e) => set('hips', e.target.value)} />
                </div>
              </div>
            </div>
            <div className="prefs-section">
              <h4>Body Shape <span className="optional">(optional)</span></h4>
              <div className="chip-group">
                {BODY_SHAPES.map((b) => (
                  <button key={b} className={`chip ${prefs.bodyShape === b ? 'active' : ''}`} onClick={() => set('bodyShape', b)}>{b}</button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Step 2: Appearance */}
        {step === 2 && (
          <>
            <div className="prefs-section">
              <h4>Skin Tone</h4>
              <div className="skin-tone-options">
                {SKIN_TONES.map((s) => (
                  <button key={s.label} className={`skin-tone-btn ${prefs.skinTone === s.label ? 'active' : ''}`} onClick={() => set('skinTone', s.label)}>
                    <span className="skin-swatch" style={{ background: s.color }} />
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="prefs-section">
              <h4>Undertone</h4>
              <div className="chip-group">
                {UNDERTONES.map((u) => (
                  <button key={u} className={`chip ${prefs.undertone === u ? 'active' : ''}`} onClick={() => set('undertone', u)}>{u}</button>
                ))}
              </div>
            </div>
            <div className="prefs-section">
              <h4>Hair</h4>
              <div className="prefs-grid-2">
                <div>
                  <p className="prefs-sublabel">Color</p>
                  <div className="chip-group">
                    {HAIR_COLORS.map((h) => (
                      <button key={h} className={`chip ${prefs.hairColor === h ? 'active' : ''}`} onClick={() => set('hairColor', h)}>{h}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="prefs-sublabel">Length</p>
                  <div className="chip-group">
                    {HAIR_LENGTHS.map((l) => (
                      <button key={l} className={`chip ${prefs.hairLength === l ? 'active' : ''}`} onClick={() => set('hairLength', l)}>{l}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="prefs-section">
              <h4>Eye Color</h4>
              <div className="chip-group">
                {EYE_COLORS.map((e) => (
                  <button key={e} className={`chip ${prefs.eyeColor === e ? 'active' : ''}`} onClick={() => set('eyeColor', e)}>{e}</button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Step 3: Style */}
        {step === 3 && (
          <>
            <div className="prefs-section">
              <h4>Preferred Colors</h4>
              <div className="palette-grid">
                {PALETTE_COLORS.map((c) => (
                  <button
                    key={c}
                    className={`palette-swatch ${prefs.preferredColors.includes(c) ? 'selected' : ''}`}
                    style={{ background: c }}
                    onClick={() => toggleColor(c)}
                    title={c}
                  />
                ))}
              </div>
            </div>
            <div className="prefs-section">
              <h4>Fashion Style</h4>
              <div className="chip-group">
                {FASHION_STYLES.map((s) => (
                  <button key={s} className={`chip ${prefs.fashionStyle === s ? 'active' : ''}`} onClick={() => set('fashionStyle', s)}>{s}</button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="prefs-nav">
        <div>
          {onCancel && <button className="btn-outline" onClick={onCancel}>Cancel</button>}
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {step > 0 && (
            <button className="btn-outline" onClick={() => setStep(step - 1)}>
              <ChevronLeft size={16} /> Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button className="btn-primary" onClick={() => setStep(step + 1)}>
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button className="btn-primary" onClick={handleSave}>
              <Check size={16} /> {saved ? 'Saved!' : 'Save Preferences'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
