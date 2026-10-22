import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Eye, EyeOff, ArrowRight, KeyRound } from 'lucide-react';
import { supabase } from '../lib/supabase';

const IMG    = 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&h=1200&fit=crop&crop=center';
const IMG_FB = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&h=1200&fit=crop';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [form,      setForm]      = useState({ password: '', confirm: '' });
  const [showPass,  setShowPass]  = useState(false);
  const [showConf,  setShowConf]  = useState(false);
  const [error,     setError]     = useState('');
  const [success,   setSuccess]   = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [ready,     setReady]     = useState(false); // true once Supabase has exchanged the token
  const [imgErr,    setImgErr]    = useState(false);

  useEffect(() => {
    // Supabase fires onAuthStateChange with event PASSWORD_RECOVERY when the
    // user arrives via the reset link. We wait for that before showing the form.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password: form.password });
    setLoading(false);

    if (updateError) { setError(updateError.message); return; }

    setSuccess(true);
    setTimeout(() => navigate('/login'), 2500);
  };

  return (
    <div className="prem-auth-page">
      <div className="prem-auth-visual">
        <img
          src={imgErr ? IMG_FB : IMG}
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
            <h2>Set a New Password</h2>
            <p>Choose a strong password to keep your style profile secure.</p>
          </div>
        </div>
      </div>

      <div className="prem-auth-form-side">
        <div className="prem-auth-form-wrap">
          <div className="prem-auth-form-header">
            <Link to="/" className="prem-auth-logo">
              <Sparkles size={18} /> StyleMatch
            </Link>
            <h1>Set new password</h1>
            <p>Enter and confirm your new password below</p>
          </div>

          {error   && <div className="prem-alert-error">{error}</div>}
          {success && (
            <div className="prem-alert-success">
              Password updated! Redirecting to sign in…
            </div>
          )}

          {!ready && !success && (
            <div className="prem-alert-error">
              Invalid or expired reset link. Please{' '}
              <Link to="/forgot-password">request a new one</Link>.
            </div>
          )}

          {ready && !success && (
            <form onSubmit={handleSubmit} noValidate className="prem-auth-form">
              <div className="prem-form-group">
                <label>New Password</label>
                <div className="prem-input-icon">
                  <input
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="New password (min 6 chars)"
                    autoComplete="new-password"
                  />
                  <button type="button" className="prem-eye-btn" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="prem-form-group">
                <label>Confirm New Password</label>
                <div className="prem-input-icon">
                  <input
                    name="confirm"
                    type={showConf ? 'text' : 'password'}
                    value={form.confirm}
                    onChange={handleChange}
                    placeholder="Re-enter new password"
                    autoComplete="new-password"
                  />
                  <button type="button" className="prem-eye-btn" onClick={() => setShowConf(!showConf)}>
                    {showConf ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="prem-submit-btn" disabled={loading}>
                <KeyRound size={17} /> {loading ? 'Updating…' : 'Update Password'} <ArrowRight size={15} />
              </button>
            </form>
          )}

          <p className="prem-auth-switch">
            <Link to="/login">Back to Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
