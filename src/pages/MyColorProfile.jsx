import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getSession, getColorProfile, saveColorProfile } from '../utils/storage';
import { Palette, Save, CheckCircle } from 'lucide-react';

const SKIN_TONES = [
  { label: 'Fair', color: '#FDDBB4' },
  { label: 'Light', color: '#F5C5A3' },
  { label: 'Medium', color: '#D4956A' },
  { label: 'Tan', color: '#B07850' },
  { label: 'Deep', color: '#6B3F2A' },
];

const UNDERTONES = ['Warm', 'Cool', 'Neutral', 'Not Sure'];
const HAIR_COLORS = ['Black', 'Dark Brown', 'Light Brown', 'Blonde', 'Red', 'Grey', 'White', 'Other'];
const EYE_COLORS = ['Black', 'Dark Brown', 'Light Brown', 'Hazel', 'Green', 'Blue', 'Grey'];
const BODY_SHAPES = ['Hourglass', 'Pear', 'Apple', 'Rectangle', 'Inverted Triangle', 'Prefer not to say'];
const GENDERS = ['Female', 'Male', 'Other', 'Prefer not to say'];

const PALETTE_COLORS = [
  '#F9A8D4', '#FBCFE8', '#FDE68A', '#A7F3D0', '#BAE6FD',
  '#C4B5FD', '#FCA5A5', '#6EE7B7', '#93C5FD', '#F0ABFC',
  '#FFFFFF', '#F5F5F4', '#D6D3D1', '#78716C', '#1F2937',
];

const colorSuggestions = {
  Fair: { Warm: ['Peach', 'Coral', 'Warm Beige', 'Gold', 'Terracotta'], Cool: ['Lavender', 'Soft Pink', 'Icy Blue', 'Mint', 'Silver'], Neutral: ['Blush', 'Cream', 'Dusty Rose', 'Sage', 'Taupe'], 'Not Sure': ['Blush Pink', 'Cream', 'Soft White', 'Light Grey', 'Pastel Blue'] },
  Light: { Warm: ['Warm Ivory', 'Peach', 'Camel', 'Rust', 'Olive'], Cool: ['Rose', 'Periwinkle', 'Soft Teal', 'Mauve', 'Powder Blue'], Neutral: ['Nude', 'Blush', 'Warm Grey', 'Dusty Mauve', 'Sage'], 'Not Sure': ['Soft Pink', 'Ivory', 'Light Lavender', 'Mint', 'Warm White'] },
  Medium: { Warm: ['Mustard', 'Burnt Orange', 'Olive', 'Warm Brown', 'Gold'], Cool: ['Cobalt Blue', 'Emerald', 'Plum', 'Fuchsia', 'Teal'], Neutral: ['Camel', 'Terracotta', 'Forest Green', 'Burgundy', 'Navy'], 'Not Sure': ['Coral', 'Teal', 'Warm Beige', 'Dusty Pink', 'Olive Green'] },
  Tan: { Warm: ['Orange', 'Warm Red', 'Gold', 'Chocolate', 'Amber'], Cool: ['Royal Blue', 'Deep Purple', 'Magenta', 'Teal', 'Emerald'], Neutral: ['Caramel', 'Rust', 'Deep Teal', 'Warm White', 'Burgundy'], 'Not Sure': ['Coral', 'Warm Brown', 'Deep Green', 'Mustard', 'Ivory'] },
  Deep: { Warm: ['Rich Gold', 'Deep Orange', 'Warm Red', 'Chocolate', 'Copper'], Cool: ['Bright White', 'Royal Blue', 'Fuchsia', 'Emerald', 'Cobalt'], Neutral: ['Ivory', 'Caramel', 'Deep Burgundy', 'Forest Green', 'Warm Taupe'], 'Not Sure': ['Bright White', 'Gold', 'Deep Red', 'Cobalt Blue', 'Emerald'] },
};

const emptyProfile = { skinTone: '', undertone: '', preferredColors: [], hairColor: '', eyeColor: '', bodyShape: '', gender: '' };

export default function MyColorProfile() {
  const user = getSession();
  const [profile, setProfile] = useState(() => getColorProfile(user.username) || emptyProfile);
  const [saved, setSaved] = useState(false);

  const toggleColor = (color) => {
    const current = profile.preferredColors;
    const updated = current.includes(color) ? current.filter((c) => c !== color) : [...current, color];
    setProfile({ ...profile, preferredColors: updated });
  };

  const handleSave = () => {
    saveColorProfile(user.username, profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const suggestions = profile.skinTone && profile.undertone
    ? colorSuggestions[profile.skinTone]?.[profile.undertone] || []
    : [];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h2>My Color Profile</h2>
            <p>Build your personal color palette for better outfit recommendations</p>
          </div>
        </div>

        <div className="color-profile-grid">
          {/* Left: Form */}
          <div className="color-form-section">
            {/* Skin Tone */}
            <div className="profile-section">
              <h4><Palette size={16} /> Skin Tone</h4>
              <div className="skin-tone-options">
                {SKIN_TONES.map((s) => (
                  <button
                    key={s.label}
                    className={`skin-tone-btn ${profile.skinTone === s.label ? 'active' : ''}`}
                    onClick={() => setProfile({ ...profile, skinTone: s.label })}
                    title={s.label}
                  >
                    <span className="skin-swatch" style={{ background: s.color }} />
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Undertone */}
            <div className="profile-section">
              <h4>Undertone</h4>
              <div className="filter-chips">
                {UNDERTONES.map((u) => (
                  <button
                    key={u}
                    className={`chip ${profile.undertone === u ? 'active' : ''}`}
                    onClick={() => setProfile({ ...profile, undertone: u })}
                  >{u}</button>
                ))}
              </div>
            </div>

            {/* Preferred Colors */}
            <div className="profile-section">
              <h4>Preferred Colors <span className="optional">(select all you like)</span></h4>
              <div className="palette-grid">
                {PALETTE_COLORS.map((c) => (
                  <button
                    key={c}
                    className={`palette-swatch ${profile.preferredColors.includes(c) ? 'selected' : ''}`}
                    style={{ background: c }}
                    onClick={() => toggleColor(c)}
                    title={c}
                    aria-label={`Color ${c}`}
                  />
                ))}
              </div>
            </div>

            {/* Optional Fields */}
            <div className="profile-section">
              <h4>Additional Details <span className="optional">(optional)</span></h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Hair Color</label>
                  <select value={profile.hairColor} onChange={(e) => setProfile({ ...profile, hairColor: e.target.value })}>
                    <option value="">Select</option>
                    {HAIR_COLORS.map((h) => <option key={h}>{h}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Eye Color</label>
                  <select value={profile.eyeColor} onChange={(e) => setProfile({ ...profile, eyeColor: e.target.value })}>
                    <option value="">Select</option>
                    {EYE_COLORS.map((e) => <option key={e}>{e}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Body Shape <span className="optional">(optional)</span></label>
                  <select value={profile.bodyShape} onChange={(e) => setProfile({ ...profile, bodyShape: e.target.value })}>
                    <option value="">Select</option>
                    {BODY_SHAPES.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Gender Preference</label>
                  <select value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })}>
                    <option value="">Select</option>
                    {GENDERS.map((g) => <option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <button className="btn-primary btn-full" onClick={handleSave}>
              <Save size={16} /> Save My Color Profile
            </button>

            {saved && (
              <div className="alert alert-success" style={{ marginTop: '1rem' }}>
                <CheckCircle size={16} /> Color profile saved successfully!
              </div>
            )}
          </div>

          {/* Right: Preview & Suggestions */}
          <div className="color-preview-section">
            <div className="preview-card">
              <h4>Your Color Profile</h4>
              {profile.skinTone ? (
                <>
                  <div className="profile-summary">
                    <div className="profile-row">
                      <span>Skin Tone</span>
                      <strong>{profile.skinTone}</strong>
                    </div>
                    {profile.undertone && (
                      <div className="profile-row">
                        <span>Undertone</span>
                        <strong>{profile.undertone}</strong>
                      </div>
                    )}
                    {profile.hairColor && (
                      <div className="profile-row">
                        <span>Hair</span>
                        <strong>{profile.hairColor}</strong>
                      </div>
                    )}
                    {profile.eyeColor && (
                      <div className="profile-row">
                        <span>Eyes</span>
                        <strong>{profile.eyeColor}</strong>
                      </div>
                    )}
                    {profile.bodyShape && (
                      <div className="profile-row">
                        <span>Body Shape</span>
                        <strong>{profile.bodyShape}</strong>
                      </div>
                    )}
                  </div>

                  {profile.preferredColors.length > 0 && (
                    <div className="selected-colors">
                      <p>Your Palette</p>
                      <div className="palette-preview">
                        {profile.preferredColors.map((c) => (
                          <span key={c} className="palette-dot" style={{ background: c }} title={c} />
                        ))}
                      </div>
                    </div>
                  )}

                  {suggestions.length > 0 && (
                    <div className="suggestions">
                      <p>Recommended Colors for You</p>
                      <div className="suggestion-tags">
                        {suggestions.map((s) => (
                          <span key={s} className="suggestion-tag">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="preview-empty">
                  <Palette size={40} />
                  <p>Select your skin tone and undertone to see personalized color suggestions.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
