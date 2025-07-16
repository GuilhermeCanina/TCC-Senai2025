function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  return res.status(403).json({ error: 'Acesso negado. Requer privilégios de administrador.' });
}

module.exports = isAdmin;