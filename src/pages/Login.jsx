import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const LOGIN_IMG    = 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&h=1200&fit=crop&crop=center';
const LOGIN_IMG_FB = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&h=1200&fit=crop';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [imgErr, setImgErr]   = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email:    form.email.trim(),
      password: form.password,
    });
    setLoading(false);

    if (authError) {
      if (authError.message.toLowerCase().includes('email not confirmed')) {
        setError('Please confirm your email address before signing in. Check your inbox for a confirmation link.');
      } else if (authError.message.toLowerCase().includes('invalid login credentials')) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError(authError.message);
      }
      return;
    }

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
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
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
              <Link to="/forgot-password" className="prem-forgot">Forgot password?</Link>
            </div>

            <button type="submit" className="prem-submit-btn" disabled={loading}>
              <LogIn size={17} /> {loading ? 'Signing in…' : 'Sign In'} <ArrowRight size={15} />
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
