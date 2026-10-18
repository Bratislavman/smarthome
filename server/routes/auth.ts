import { Router, Request, Response } from 'express';
import { users } from '../data/mockData';

const router = Router();

// POST /api/auth/login
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Генерируем фейковый JWT токен
    const token = `fake-jwt-token-${user.id}-${Date.now()}`;
    
    return res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: new Date().toISOString()
      },
      token
    });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

// GET /api/auth/me
router.get('/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // В реальном проекте здесь верификация JWT
  // Для демо просто возвращаем первого пользователя или ищем по ID из токена
  const tokenParts = authHeader.split(' ')[1].split('-');
  const userId = tokenParts[3]; 

  console.log(authHeader, 'authHeader')
  console.log( userId, 'authHeader2')
  
  const user = users.find(u => u.id === userId);

  if (user) {
    return res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: new Date().toISOString()
    });
  } else {
    return res.status(401).json({ message: 'User not found' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req: Request, res: Response) => {
  res.json({ message: 'Logged out successfully' });
});

export default router;