import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Eye, EyeOff, UserPlus, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const SIGNUP_IMG    = 'https://i.pinimg.com/736x/5a/be/67/5abe674b331dcaf33ddd76ffbac62967.jpg';
const SIGNUP_IMG_FB = 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&h=1200&fit=crop';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '', username: '', email: '', password: '', confirm: '', gender: '',
  });
  const [errors,      setErrors]      = useState({});
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success,     setSuccess]     = useState('');
  const [loading,     setLoading]     = useState(false);
  const [imgErr,      setImgErr]      = useState(false);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())  e.fullName = 'Full name is required.';
    if (!form.username.trim())  e.username = 'Username is required.';
    else if (form.username.length < 3) e.username = 'Username must be at least 3 characters.';
    if (!form.email.trim())     e.email    = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email address.';
    if (!form.password)         e.password = 'Password is required.';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters.';
    if (!form.confirm)          e.confirm  = 'Please confirm your password.';
    else if (form.confirm !== form.password) e.confirm = 'Passwords do not match.';
    if (!form.gender)           e.gender   = 'Please select a gender option.';
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }

    setLoading(true);
    const { data, error: authError } = await supabase.auth.signUp({
      email:    form.email.trim(),
      password: form.password,
      options: {
        data: {
          full_name: form.fullName.trim(),
          username:  form.username.trim(),
          gender:    form.gender,
        },
      },
    });
    setLoading(false);

    if (authError) {
      if (authError.message.toLowerCase().includes('already registered')) {
        setErrors({ email: 'An account with this email already exists.' });
      } else {
        setErrors({ email: authError.message });
      }
      return;
    }

    // Supabase returns a session immediately when email confirmation is disabled,
    // or returns a user with no session when confirmation is required.
    if (data.session) {
      // Email confirmation disabled — user is logged in straight away
      navigate('/dashboard');
    } else {
      // Email confirmation required
      setSuccess('Account created! Please check your email to confirm your address, then sign in.');
    }
  };

  return (
    <div className="prem-auth-page">
      <div className="prem-auth-visual">
        <img
          src={imgErr ? SIGNUP_IMG_FB : SIGNUP_IMG}
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
            <h2>Your Personal Style Awaits</h2>
            <p>Join thousands of fashion lovers who have discovered their signature look with StyleMatch.</p>
            <div className="prem-auth-visual-tags">
              <span>10K+ Users</span>
              <span>500+ Styles</span>
              <span>Free Forever</span>
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
            <h1>Create account</h1>
            <p>Start your personalised style journey today</p>
          </div>

          {success && (
            <div className="prem-alert-success">{success}</div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} noValidate className="prem-auth-form">
              <div className="prem-form-row">
                <div className="prem-form-group">
                  <label>Full Name</label>
                  <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Your full name" />
                  {errors.fullName && <span className="prem-form-error">{errors.fullName}</span>}
                </div>
                <div className="prem-form-group">
                  <label>Username</label>
                  <input name="username" value={form.username} onChange={handleChange} placeholder="Choose a username" />
                  {errors.username && <span className="prem-form-error">{errors.username}</span>}
                </div>
              </div>

              <div className="prem-form-group">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  autoComplete="email"
                />
                {errors.email && <span className="prem-form-error">{errors.email}</span>}
              </div>

              <div className="prem-form-group">
                <label>Password</label>
                <div className="prem-input-icon">
                  <input
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a password (min 6 chars)"
                  />
                  <button type="button" className="prem-eye-btn" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <span className="prem-form-error">{errors.password}</span>}
              </div>

              <div className="prem-form-group">
                <label>Confirm Password</label>
                <div className="prem-input-icon">
                  <input
                    name="confirm"
                    type={showConfirm ? 'text' : 'password'}
                    value={form.confirm}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                  />
                  <button type="button" className="prem-eye-btn" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirm && <span className="prem-form-error">{errors.confirm}</span>}
              </div>

              <div className="prem-form-group">
                <label>Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange}>
                  <option value="">Select gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                {errors.gender && <span className="prem-form-error">{errors.gender}</span>}
              </div>

              <button type="submit" className="prem-submit-btn" disabled={loading}>
                <UserPlus size={17} /> {loading ? 'Creating account…' : 'Create Account'} <ArrowRight size={15} />
              </button>
            </form>
          )}

          {success && (
            <p className="prem-auth-switch">
              <Link to="/login">Go to Sign In</Link>
            </p>
          )}

          {!success && (
            <p className="prem-auth-switch">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
