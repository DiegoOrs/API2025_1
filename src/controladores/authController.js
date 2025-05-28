import jwt from 'jsonwebtoken';

export const login = (req, res) => {
  // Generar token SIN validar credenciales (acepta cualquier email/password)
  const { email = "user@example.com", password = "" } = req.body; // Valores por defecto

  const token = jwt.sign(
    { 
      email,  // Usa el email recibido (o el valor por defecto)
      role: "user", // Rol genérico
      randomId: Math.random().toString(36).substring(2) // ID aleatorio
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ 
    success: true,
    token,
    debug: "Token generado sin validación de credenciales" 
  });
};