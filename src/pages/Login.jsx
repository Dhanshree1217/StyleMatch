import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';
import { findUser, setSession } from '../utils/storage';

const LOGIN_IMG = 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&h=1200&fit=crop&crop=center';
const LOGIN_IMG_FB = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&h=1200&fit=crop';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [imgErr, setImgErr] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password) {
      setError('Please enter both username and password.');
      return;
    }
    const user = findUser(form.username);
    if (!user || user.password !== form.password) {
      setError('Invalid username or password. Please try again.');
      return;
    }
    setSession(user);
    navigate('/dashboard');
  };

  return (
    <div className="prem-auth-page">
      <div className="prem-auth-visual">
        <img
          src={imgErr ? LOGIN_IMG_FB : LOGIN_IMG}
          alt="Fashion editorial"
          className="prem-auth-img"
          onError={() => setImgErr(true)}
        />
        <div className="prem-auth-visual-overlay">
          <div className="prem-auth-visual-content">
            <div className="prem-auth-brand">
              <Sparkles size={28} />
              <span>StyleMatch</span>
            </div>
            <h2>Where Style Meets Confidence</h2>
            <p>Discover outfits curated for your unique personality, body type and colour palette.</p>
            <div className="prem-auth-visual-tags">
              <span>Virtual Try-On</span>
              <span>AI Styling</span>
              <span>Color Matching</span>
            </div>
          </div>
        </div>
      </div>

      <div className="prem-auth-form-side">
        <div className="prem-auth-form-wrap">
          <div className="prem-auth-form-header">
            <Link to="/" className="prem-auth-logo">
              <Sparkles size={18} /> StyleMatch
            </Link>
            <h1>Welcome back</h1>
            <p>Sign in to continue your style journey</p>
          </div>

          {error && <div className="prem-alert-error">{error}</div>}

          <form onSubmit={handleSubmit} noValidate className="prem-auth-form">
            <div className="prem-form-group">
              <label>Username</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                autoComplete="username"
              />
            </div>

            <div className="prem-form-group">
              <label>Password</label>
              <div className="prem-input-icon">
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button type="button" className="prem-eye-btn" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="prem-form-meta">
              <a href="#" className="prem-forgot">Forgot password?</a>
            </div>

            <button type="submit" className="prem-submit-btn">
              <LogIn size={17} /> Sign In <ArrowRight size={15} />
            </button>
          </form>

          <p className="prem-auth-switch">
            New to StyleMatch? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
