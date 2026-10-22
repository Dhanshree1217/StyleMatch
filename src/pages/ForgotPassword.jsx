import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

const IMG    = 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&h=1200&fit=crop&crop=center';
const IMG_FB = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&h=1200&fit=crop';

export default function ForgotPassword() {
  const [email,   setEmail]   = useState('');
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgErr,  setImgErr]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setError('Please enter your email address.'); return; }
    setLoading(true);
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (authError) { setError(authError.message); return; }
    setSuccess(true);
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
            <h2>Reset Your Password</h2>
            <p>We'll send a secure link to your email so you can get back to your style journey.</p>
          </div>
        </div>
      </div>

      <div className="prem-auth-form-side">
        <div className="prem-auth-form-wrap">
          <div className="prem-auth-form-header">
            <Link to="/" className="prem-auth-logo">
              <Sparkles size={18} /> StyleMatch
            </Link>
            <h1>Forgot password?</h1>
            <p>Enter your email and we'll send you a reset link</p>
          </div>

          {error   && <div className="prem-alert-error">{error}</div>}
          {success && (
            <div className="prem-alert-success">
              Reset link sent! Check your inbox and follow the link to set a new password.
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} noValidate className="prem-auth-form">
              <div className="prem-form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="your@email.com"
                  autoComplete="email"
                />
              </div>

              <button type="submit" className="prem-submit-btn" disabled={loading}>
                <Mail size={17} /> {loading ? 'Sending…' : 'Send Reset Link'} <ArrowRight size={15} />
              </button>
            </form>
          )}

          <p className="prem-auth-switch">
            Remembered it? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
