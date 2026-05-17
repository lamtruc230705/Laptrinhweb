const { query, execute } = require('../config/database');

function createHttpError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

async function getMyProfile(userId) {
  const rows = await query(
    'SELECT id, username, full_name, email, phone, avatar, role, status, created_at, updated_at FROM users WHERE id = ? LIMIT 1',
    [userId]
  );

  if (!rows.length) {
    throw createHttpError('Khong tim thay nguoi dung.', 404);
  }

  return rows[0];
}

async function updateMyProfile(userId, payload = {}) {
  const fields = [];
  const params = [];

  if (Object.prototype.hasOwnProperty.call(payload, 'username')) {
    const username = String(payload.username || '').trim();
    if (!username) throw createHttpError('Ten dang nhap khong duoc de trong.', 400);

    const existed = await query('SELECT id FROM users WHERE username = ? AND id <> ? LIMIT 1', [username, userId]);
    if (existed.length) throw createHttpError('Ten dang nhap da duoc su dung.', 409);

    fields.push('username = ?');
    params.push(username);
  }

  if (Object.prototype.hasOwnProperty.call(payload, 'full_name')) {
    fields.push('full_name = ?');
    params.push(String(payload.full_name || '').trim() || null);
  }

  if (Object.prototype.hasOwnProperty.call(payload, 'phone')) {
    fields.push('phone = ?');
    params.push(String(payload.phone || '').trim() || null);
  }

  if (fields.length) {
    fields.push('updated_at = NOW()');
    params.push(userId);
    await execute(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, params);
  }

  return getMyProfile(userId);
}

module.exports = {
  getMyProfile,
  updateMyProfile
};
