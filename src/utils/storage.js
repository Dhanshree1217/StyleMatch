// LocalStorage utility helpers
// NOTE: In production, never store passwords in plain text.
// Use a secure backend with bcrypt/argon2 password hashing.

export const getUsers = () => JSON.parse(localStorage.getItem('sm_users') || '[]');

export const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('sm_users', JSON.stringify(users));
};

export const findUser = (username) =>
  getUsers().find((u) => u.username.toLowerCase() === username.toLowerCase());

export const setSession = (user) =>
  localStorage.setItem('sm_session', JSON.stringify(user));

export const getSession = () =>
  JSON.parse(localStorage.getItem('sm_session') || 'null');

export const clearSession = () =>
  localStorage.removeItem('sm_session');

export const getWardrobe = (username) =>
  JSON.parse(localStorage.getItem(`sm_wardrobe_${username}`) || '[]');

export const saveWardrobe = (username, items) =>
  localStorage.setItem(`sm_wardrobe_${username}`, JSON.stringify(items));

export const getColorProfile = (username) =>
  JSON.parse(localStorage.getItem(`sm_color_${username}`) || 'null');

export const saveColorProfile = (username, profile) =>
  localStorage.setItem(`sm_color_${username}`, JSON.stringify(profile));

export const getSavedOutfits = (username) =>
  JSON.parse(localStorage.getItem(`sm_outfits_${username}`) || '[]');

export const saveOutfits = (username, outfits) =>
  localStorage.setItem(`sm_outfits_${username}`, JSON.stringify(outfits));

// Style preferences (non-photo data only)
export const getStylePrefs = (username) =>
  JSON.parse(localStorage.getItem(`sm_styleprefs_${username}`) || 'null');

export const saveStylePrefs = (username, prefs) =>
  localStorage.setItem(`sm_styleprefs_${username}`, JSON.stringify(prefs));

// Saved looks (outfit combinations — no photos)
export const getSavedLooks = (username) =>
  JSON.parse(localStorage.getItem(`sm_looks_${username}`) || '[]');

export const saveLooks = (username, looks) =>
  localStorage.setItem(`sm_looks_${username}`, JSON.stringify(looks));

// Avatar customization (non-photo preferences only)
export const getAvatarPrefs = (username) =>
  JSON.parse(localStorage.getItem(`sm_avatar_${username}`) || 'null');

export const saveAvatarPrefs = (username, prefs) =>
  localStorage.setItem(`sm_avatar_${username}`, JSON.stringify(prefs));
