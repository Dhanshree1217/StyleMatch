import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, Heart, User, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { getSession, clearSession } from '../utils/storage';

const HOME_NAV = [
  { label: 'Home',        href: '#top' },
  { label: 'Collections', href: '#collections' },
  { label: 'Trending',    href: '#trending' },
  { label: 'Editorial',   href: '#editorial' },
  { label: 'Features',    href: '#features' },
  { label: 'Reviews',     href: '#reviews' },
];

function scrollTo(id) {
  if (id === '#top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const el = document.querySelector(id);
  if (!el) return;
  const navH = document.querySelector('.navbar')?.offsetHeight || 68;
  const top = el.getBoundingClientRect().top + window.scrollY - navH - 12;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const session = getSession();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleLogout = () => {
    clearSession();
    navigate('/');
    setOpen(false);
  };

  const handleHomeNav = (e, href) => {
    e.preventDefault();
    setOpen(false);
    if (!isHome) {
      navigate('/');
      setTimeout(() => scrollTo(href), 120);
    } else {
      scrollTo(href);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <Sparkles size={22} />
        <span>StyleMatch</span>
      </Link>

      <ul className={`navbar-links ${open ? 'open' : ''}`}>
        {HOME_NAV.map((l) => (
          <li key={l.label}>
            <a href={l.href} onClick={(e) => handleHomeNav(e, l.href)}>
              {l.label}
            </a>
          </li>
        ))}
        {session ? (
          <>
            <li><Link to="/dashboard" className="navbar-icon-link" onClick={() => setOpen(false)}><LayoutDashboard size={14} />Dashboard</Link></li>
            <li><button className="btn-outline" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="btn-outline" onClick={() => setOpen(false)}>Login</Link></li>
            <li><Link to="/signup" className="btn-primary" onClick={() => setOpen(false)}>Sign Up</Link></li>
          </>
        )}
      </ul>

      <div className="navbar-actions">
        {session && (
          <>
            <Link to="/dashboard" className="navbar-icon-btn" title="Dashboard"><LayoutDashboard size={18} /></Link>
            <Link to="/wardrobe" className="navbar-icon-btn" title="My Wardrobe"><Heart size={18} /></Link>
            <Link to="/dashboard" className="navbar-icon-btn" title="Profile"><User size={18} /></Link>
          </>
        )}
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
