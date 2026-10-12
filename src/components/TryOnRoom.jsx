import { useState, useMemo } from 'react';
import AvatarViewer from './AvatarViewer';
import { getMatchingBottoms, DEMO_BOTTOMS, DEMO_SHOES, DEMO_ACCESSORIES } from '../data/colorRules';
import { Shirt, Save, RefreshCw, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=240&fit=crop';

function ItemCard({ item, selected, onClick, size = 'md' }) {
  const [err, setErr] = useState(false);
  return (
    <button
      className={`tryon-item-card ${selected ? 'selected' : ''} size-${size}`}
      onClick={() => onClick(item)}
      title={item.name}
    >
      <img src={err ? FALLBACK_IMG : (item.imageUrl || FALLBACK_IMG)} alt={item.name} onError={() => setErr(true)} />
      <div className="tryon-item-info">
        <span className="tryon-item-name">{item.name}</span>
        <span className="color-dot" style={{ background: item.color }} />
      </div>
      {selected && <span className="tryon-selected-badge"><CheckCircle size={14} /></span>}
    </button>
  );
}

function ColorSwatch({ color, label }) {
  return (
    <div className="color-combo-swatch">
      <span style={{ background: color }} className="swatch-circle" />
      <span>{label}</span>
    </div>
  );
}

export default function TryOnRoom({ wardrobeTops, wardrobeBottoms, prefs, onSaveLook }) {
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [saved, setSaved] = useState(false);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  // Merge wardrobe tops with demo tops for display
  const allTops = useMemo(() => {
    const wTops = wardrobeTops.filter((i) => ['Tops', 'Dresses'].includes(i.category));
    return wTops.length > 0 ? wTops : [];
  }, [wardrobeTops]);

  const allBottoms = useMemo(() => {
    const wBottoms = wardrobeBottoms.filter((i) => i.category === 'Bottoms');
    return wBottoms.length > 0 ? [...wBottoms, ...DEMO_BOTTOMS] : DEMO_BOTTOMS;
  }, [wardrobeBottoms]);

  // Get color-matched bottom suggestions based on selected top
  const matchedBottoms = useMemo(() => {
    if (!selectedTop) return DEMO_BOTTOMS;
    const rules = getMatchingBottoms(selectedTop.color);
    // Try to find matching items from allBottoms first
    const matched = rules.map((rule) => {
      const found = allBottoms.find((b) => b.color === rule.hex || b.name.toLowerCase().includes(rule.label.toLowerCase().split(' ')[0]));
      return found || { id: `demo_${rule.label}`, name: rule.label, category: 'Bottoms', color: rule.hex, imageUrl: DEMO_BOTTOMS.find((d) => d.color === rule.hex)?.imageUrl || FALLBACK_IMG, isDemo: true };
    });
    return matched;
  }, [selectedTop, allBottoms]);

  const handleSaveLook = () => {
    if (!selectedTop && !selectedBottom) return;
    const look = {
      id: Date.now(),
      topId: selectedTop?.id, topName: selectedTop?.name, topColor: selectedTop?.color,
      bottomId: selectedBottom?.id, bottomName: selectedBottom?.name, bottomColor: selectedBottom?.color,
      shoeId: selectedShoe?.id, shoeName: selectedShoe?.name,
      accessoryId: selectedAccessory?.id, accessoryName: selectedAccessory?.name,
      savedAt: new Date().toLocaleDateString(),
    };
    onSaveLook(look);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setSelectedTop(null);
    setSelectedBottom(null);
    setSelectedShoe(null);
    setSelectedAccessory(null);
  };

  return (
    <div className="tryon-room">
      {/* LEFT PANEL */}
      <div className={`tryon-panel tryon-left ${leftCollapsed ? 'collapsed' : ''}`}>
        <button className="panel-collapse-btn" onClick={() => setLeftCollapsed(!leftCollapsed)}>
          {leftCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          <span>{leftCollapsed ? 'Show Wardrobe' : 'My Wardrobe'}</span>
        </button>

        {!leftCollapsed && (
          <>
            <div className="tryon-section">
              <h5><Shirt size={14} /> Select a Top</h5>
              {allTops.length === 0 ? (
                <p className="tryon-empty-hint">Add tops to your wardrobe to see them here.</p>
              ) : (
                <div className="tryon-items-scroll">
                  {allTops.map((item) => (
                    <ItemCard key={item.id} item={item} selected={selectedTop?.id === item.id} onClick={setSelectedTop} />
                  ))}
                </div>
              )}
            </div>

            {selectedTop && (
              <div className="tryon-section">
                <h5>Matching Bottoms</h5>
                <p className="tryon-match-note">Based on color compatibility with your selected top</p>
                <div className="tryon-items-scroll">
                  {matchedBottoms.map((item) => (
                    <ItemCard key={item.id} item={item} selected={selectedBottom?.id === item.id} onClick={setSelectedBottom} />
                  ))}
                </div>
                {matchedBottoms.some((m) => m.isDemo) && (
                  <p className="tryon-demo-note">★ Demo suggestions — add your own bottoms to the wardrobe for personalized matches.</p>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* CENTER PANEL */}
      <div className="tryon-panel tryon-center">
        <div className="tryon-center-header">
          <h4>Virtual Try-On</h4>
          <div className="tryon-center-actions">
            <button className="btn-outline btn-sm" onClick={handleReset}><RefreshCw size={14} /> Reset</button>
          </div>
        </div>

        <AvatarViewer
          prefs={prefs}
          selectedTop={selectedTop}
          selectedBottom={selectedBottom}
          selectedShoe={selectedShoe}
        />

        {(selectedTop || selectedBottom) && (
          <div className="tryon-outfit-summary">
            {selectedTop && <span className="outfit-summary-tag" style={{ borderColor: selectedTop.color }}>👕 {selectedTop.name}</span>}
            {selectedBottom && <span className="outfit-summary-tag" style={{ borderColor: selectedBottom.color }}>👖 {selectedBottom.name}</span>}
            {selectedShoe && <span className="outfit-summary-tag">👟 {selectedShoe.name}</span>}
          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className={`tryon-panel tryon-right ${rightCollapsed ? 'collapsed' : ''}`}>
        <button className="panel-collapse-btn" onClick={() => setRightCollapsed(!rightCollapsed)}>
          {rightCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          <span>{rightCollapsed ? 'Show Details' : 'Outfit Details'}</span>
        </button>

        {!rightCollapsed && (
          <>
            <div className="tryon-section">
              <h5>Selected Outfit</h5>
              <div className="selected-outfit-preview">
                {selectedTop ? (
                  <div className="selected-item-row">
                    <img src={selectedTop.imageUrl || FALLBACK_IMG} alt={selectedTop.name} onError={(e) => { e.target.src = FALLBACK_IMG; }} />
                    <div><span className="tryon-label">Top</span><strong>{selectedTop.name}</strong></div>
                  </div>
                ) : <p className="tryon-empty-hint">No top selected</p>}

                {selectedBottom ? (
                  <div className="selected-item-row">
                    <img src={selectedBottom.imageUrl || FALLBACK_IMG} alt={selectedBottom.name} onError={(e) => { e.target.src = FALLBACK_IMG; }} />
                    <div><span className="tryon-label">Bottom</span><strong>{selectedBottom.name}</strong></div>
                  </div>
                ) : <p className="tryon-empty-hint">No bottom selected</p>}
              </div>
            </div>

            <div className="tryon-section">
              <h5>Shoes</h5>
              <div className="tryon-items-scroll horizontal">
                {DEMO_SHOES.map((s) => (
                  <ItemCard key={s.id} item={s} selected={selectedShoe?.id === s.id} onClick={setSelectedShoe} size="sm" />
                ))}
              </div>
            </div>

            <div className="tryon-section">
              <h5>Accessories</h5>
              <div className="tryon-items-scroll horizontal">
                {DEMO_ACCESSORIES.map((a) => (
                  <ItemCard key={a.id} item={a} selected={selectedAccessory?.id === a.id} onClick={setSelectedAccessory} size="sm" />
                ))}
              </div>
            </div>

            {(selectedTop || selectedBottom) && (
              <div className="tryon-section">
                <h5>Color Combination</h5>
                <div className="color-combo">
                  {selectedTop && <ColorSwatch color={selectedTop.color} label="Top" />}
                  {selectedBottom && <ColorSwatch color={selectedBottom.color} label="Bottom" />}
                  {selectedShoe && <ColorSwatch color={selectedShoe.color} label="Shoes" />}
                </div>
              </div>
            )}

            <div className="tryon-actions">
              <button
                className={`btn-primary btn-full ${saved ? 'saved' : ''}`}
                onClick={handleSaveLook}
                disabled={!selectedTop && !selectedBottom}
              >
                {saved ? <><CheckCircle size={16} /> Look Saved!</> : <><Save size={16} /> Save Look</>}
              </button>
              <button className="btn-outline btn-full" onClick={handleReset}>
                <RefreshCw size={15} /> Try Another Combination
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
