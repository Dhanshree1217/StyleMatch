import { useState, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import StylePreferencesForm from '../components/StylePreferencesForm';
import PhotoCapture from '../components/PhotoCapture';
import AvatarViewer from '../components/AvatarViewer';
import TryOnRoom from '../components/TryOnRoom';
import { getSession, getWardrobe, saveWardrobe, getStylePrefs, saveStylePrefs, getAvatarPrefs, saveAvatarPrefs, getSavedLooks, saveLooks } from '../utils/storage';
import { Plus, Trash2, Shirt, X, Upload, User, Camera, Sparkles, BookOpen, Edit2, CheckCircle } from 'lucide-react';

const CATEGORIES = ['All', 'Tops', 'Bottoms', 'Dresses', 'Shoes', 'Bags', 'Jewellery', 'Accessories'];
const ITEM_CATEGORIES = ['Tops', 'Shirts', 'T-Shirts', 'Bottoms', 'Jeans', 'Skirts', 'Dresses', 'Shoes', 'Bags', 'Jewellery', 'Accessories'];
const TABS = [
  { id: 'closet', label: 'My Closet', icon: <Shirt size={16} /> },
  { id: 'tryon', label: 'Try-On Room', icon: <Sparkles size={16} /> },
  { id: 'avatar', label: 'My Avatar', icon: <User size={16} /> },
  { id: 'prefs', label: 'Preferences', icon: <BookOpen size={16} /> },
];
const emptyForm = { name: '', category: 'Tops', color: '#f9a8d4', imageUrl: '', size: '', style: '' };
const FALLBACK = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop';

// Normalize category for filtering (Shirts/T-Shirts → Tops, Jeans/Skirts → Bottoms)
function normalizeCategory(cat) {
  if (['Shirts', 'T-Shirts', 'Tops'].includes(cat)) return 'Tops';
  if (['Jeans', 'Skirts', 'Bottoms'].includes(cat)) return 'Bottoms';
  return cat;
}

export default function MyWardrobe() {
  const user = getSession();
  const [activeTab, setActiveTab] = useState('closet');
  const [items, setItems] = useState(getWardrobe(user.username));
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState('');
  const [stylePrefs, setStylePrefs] = useState(getStylePrefs(user.username));
  const [avatarPrefs, setAvatarPrefs] = useState(getAvatarPrefs(user.username));
  const [savedLooks, setSavedLooks] = useState(getSavedLooks(user.username));
  const [showPhotoCapture, setShowPhotoCapture] = useState(false);
  // tempPhotoRef holds the in-memory photo URL — never persisted
  const tempPhotoRef = useRef(null);
  const [photoConfirmed, setPhotoConfirmed] = useState(false);
  const [prefsSaved, setPrefsSaved] = useState(false);
  const fileRef = useRef();

  const filtered = filter === 'All'
    ? items
    : items.filter((i) => normalizeCategory(i.category) === filter || i.category === filter);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Item name is required.';
    return e;
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target.result);
      setForm((f) => ({ ...f, imageUrl: ev.target.result }));
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const openAdd = () => { setEditItem(null); setForm(emptyForm); setPreview(''); setErrors({}); setShowModal(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ name: item.name, category: item.category, color: item.color, imageUrl: item.imageUrl || '', size: item.size || '', style: item.style || '' }); setPreview(item.imageUrl || ''); setErrors({}); setShowModal(true); };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    let updated;
    if (editItem) {
      updated = items.map((i) => i.id === editItem.id ? { ...i, ...form } : i);
    } else {
      updated = [...items, { id: Date.now(), ...form }];
    }
    setItems(updated);
    saveWardrobe(user.username, updated);
    setShowModal(false);
    setForm(emptyForm);
    setPreview('');
    setErrors({});
    setEditItem(null);
  };

  const handleRemove = (id) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    saveWardrobe(user.username, updated);
  };

  const handleSavePrefs = (prefs) => {
    setStylePrefs(prefs);
    setAvatarPrefs(prefs);
    saveStylePrefs(user.username, prefs);
    saveAvatarPrefs(user.username, prefs);
    setPrefsSaved(true);
    setTimeout(() => setPrefsSaved(false), 2000);
  };

  const handlePhotoConfirm = (tempUrl) => {
    // Store ONLY in memory ref — never in state that could be persisted
    tempPhotoRef.current = tempUrl;
    setPhotoConfirmed(true);
    setShowPhotoCapture(false);
  };

  const handleRemovePhoto = () => {
    if (tempPhotoRef.current) {
      URL.revokeObjectURL(tempPhotoRef.current);
      tempPhotoRef.current = null;
    }
    setPhotoConfirmed(false);
  };

  const handleSaveLook = (look) => {
    const updated = [...savedLooks, look];
    setSavedLooks(updated);
    saveLooks(user.username, updated);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h2>My Wardrobe</h2>
            <p>Virtual Try-On Room · Digital Closet · Personal Avatar</p>
          </div>
          {activeTab === 'closet' && (
            <button className="btn-primary" onClick={openAdd}>
              <Plus size={17} /> Add Item
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="wardrobe-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`wardrobe-tab ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* ── TAB: MY CLOSET ── */}
        {activeTab === 'closet' && (
          <>
            <div className="filter-tabs">
              {CATEGORIES.map((cat) => (
                <button key={cat} className={`filter-tab ${filter === cat ? 'active' : ''}`} onClick={() => setFilter(cat)}>
                  {cat}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="empty-state">
                <Shirt size={56} />
                <h3>No items yet</h3>
                <p>{filter === 'All' ? 'Start building your digital wardrobe.' : `No items in ${filter}.`}</p>
                {filter === 'All' && <button className="btn-primary" onClick={openAdd}><Plus size={16} /> Add First Item</button>}
              </div>
            ) : (
              <div className="wardrobe-grid">
                {filtered.map((item) => (
                  <div key={item.id} className="wardrobe-card">
                    <div className="wardrobe-img-wrap">
                      <img src={item.imageUrl || FALLBACK} alt={item.name} onError={(e) => { e.target.src = FALLBACK; }} />
                      <div className="wardrobe-card-actions">
                        <button className="wardrobe-action-btn edit" onClick={() => openEdit(item)} title="Edit"><Edit2 size={13} /></button>
                        <button className="wardrobe-action-btn remove" onClick={() => handleRemove(item.id)} title="Remove"><Trash2 size={13} /></button>
                      </div>
                    </div>
                    <div className="wardrobe-info">
                      <span className="wardrobe-category">{item.category}</span>
                      <h4>{item.name}</h4>
                      <div className="wardrobe-meta">
                        <span className="color-dot" style={{ background: item.color }} />
                        {item.size && <span className="wardrobe-size-tag">{item.size}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── TAB: TRY-ON ROOM ── */}
        {activeTab === 'tryon' && (
          <TryOnRoom
            wardrobeTops={items}
            wardrobeBottoms={items}
            prefs={stylePrefs || avatarPrefs}
            onSaveLook={handleSaveLook}
          />
        )}

        {/* ── TAB: MY AVATAR ── */}
        {activeTab === 'avatar' && (
          <div className="avatar-tab">
            <div className="avatar-tab-header">
              <div>
                <h3>My Avatar</h3>
                <p>A generic 3D avatar customized with your style preferences. No photo is stored.</p>
              </div>
              <div className="avatar-tab-btns">
                {!photoConfirmed ? (
                  <button className="btn-outline" onClick={() => setShowPhotoCapture(true)}>
                    <Camera size={16} /> Add Reference Photo
                  </button>
                ) : (
                  <button className="btn-outline" onClick={handleRemovePhoto}>
                    <X size={16} /> Remove Photo
                  </button>
                )}
                <button className="btn-primary" onClick={() => setActiveTab('prefs')}>
                  <Edit2 size={15} /> Edit Preferences
                </button>
              </div>
            </div>

            {photoConfirmed && (
              <div className="alert alert-success" style={{ marginBottom: '16px' }}>
                <CheckCircle size={15} /> Reference photo loaded in memory only — not saved anywhere.
                <button className="alert-dismiss" onClick={handleRemovePhoto}><X size={14} /></button>
              </div>
            )}

            {showPhotoCapture && (
              <div className="modal-overlay" onClick={() => setShowPhotoCapture(false)}>
                <div className="modal" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>Reference Photo</h3>
                    <button className="icon-btn" onClick={() => setShowPhotoCapture(false)}><X size={20} /></button>
                  </div>
                  <PhotoCapture
                    onConfirm={handlePhotoConfirm}
                    onCancel={() => setShowPhotoCapture(false)}
                  />
                </div>
              </div>
            )}

            <AvatarViewer prefs={stylePrefs || avatarPrefs} />

            {savedLooks.length > 0 && (
              <div className="saved-looks">
                <h4>Saved Looks</h4>
                <div className="saved-looks-grid">
                  {savedLooks.map((look) => (
                    <div key={look.id} className="saved-look-card">
                      <div className="saved-look-colors">
                        {look.topColor && <span className="swatch-circle" style={{ background: look.topColor }} />}
                        {look.bottomColor && <span className="swatch-circle" style={{ background: look.bottomColor }} />}
                      </div>
                      <div>
                        <p><strong>{look.topName || '—'}</strong> + {look.bottomName || '—'}</p>
                        {look.shoeName && <p className="saved-look-meta">Shoes: {look.shoeName}</p>}
                        <p className="saved-look-meta">{look.savedAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB: PREFERENCES ── */}
        {activeTab === 'prefs' && (
          <div className="prefs-tab">
            <div className="prefs-tab-header">
              <h3>Style Preferences</h3>
              <p>These preferences personalize your avatar and outfit recommendations. No photos are stored here.</p>
            </div>
            {prefsSaved && (
              <div className="alert alert-success"><CheckCircle size={15} /> Preferences saved!</div>
            )}
            <StylePreferencesForm
              initial={stylePrefs}
              onSave={handleSavePrefs}
              onCancel={null}
            />
          </div>
        )}

        {/* Add / Edit Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{editItem ? 'Edit Item' : 'Add Clothing Item'}</h3>
                <button className="icon-btn" onClick={() => setShowModal(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Item Name</label>
                  <input value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({}); }} placeholder="e.g. Blue Denim Jacket" />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                      {ITEM_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Size (optional)</label>
                    <select value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })}>
                      <option value="">Select size</option>
                      {['XS','S','M','L','XL','XXL'].map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Color</label>
                    <div className="color-input-wrap">
                      <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
                      <span>{form.color}</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Style (optional)</label>
                    <select value={form.style} onChange={(e) => setForm({ ...form, style: e.target.value })}>
                      <option value="">Select style</option>
                      {['Casual','Formal','Streetwear','Elegant','Minimal','Traditional'].map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Image URL (optional)</label>
                  <input value={form.imageUrl} onChange={(e) => { setForm({ ...form, imageUrl: e.target.value }); setPreview(e.target.value); }} placeholder="https://example.com/image.jpg" />
                </div>
                <div className="form-group">
                  <label>Or Upload Image <span className="optional">(stored locally with your consent)</span></label>
                  <button type="button" className="btn-outline upload-btn" onClick={() => fileRef.current.click()}>
                    <Upload size={15} /> Choose File
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
                  {preview && <img src={preview} alt="preview" className="img-preview" onError={() => setPreview('')} />}
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn-primary">{editItem ? 'Save Changes' : 'Add to Wardrobe'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
