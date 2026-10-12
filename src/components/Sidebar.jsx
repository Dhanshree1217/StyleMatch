import { NavLink, useNavigate } from 'react-router-dom';
import { Sparkles, LayoutDashboard, Shirt, Palette, Star, LogOut, X, Menu } from 'lucide-react';
import { clearSession } from '../utils/storage';
import { useState } from 'react';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'My Wardrobe', to: '/wardrobe', icon: <Shirt size={18} /> },
  { label: 'My Style', to: '/style', icon: <Star size={18} /> },
  { label: 'My Color Profile', to: '/color-profile', icon: <Palette size={18} /> },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    clearSession();
    navigate('/');
  };

  const handleNavClick = () => setMobileOpen(false);

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {mobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-logo">
          <Sparkles size={20} />
          {!collapsed && <span>StyleMatch</span>}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
              title={collapsed ? item.label : ''}
              onClick={handleNavClick}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <button
          className="sidebar-item sidebar-logout"
          onClick={handleLogout}
          title={collapsed ? 'Logout' : ''}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>

        <button
          className="sidebar-collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Collapse sidebar"
        >
          {collapsed ? <Menu size={16} /> : <X size={16} />}
        </button>
      </aside>
    </>
  );
}
