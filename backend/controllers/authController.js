const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar usuário
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'Usuário já existe' });

        user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
};

// Login de usuário
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Usuário não encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Senha inválida' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
};

// Middleware para verificar o token JWT
exports.authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'Nenhum token, autorização negada' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token inválido' });
    }
};

// Obter informações do usuário autenticado
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user); // Ao adicionar '.select('-password')', remove-se a senha dos dados retornados

        if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });

        res.json(user);
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
};
