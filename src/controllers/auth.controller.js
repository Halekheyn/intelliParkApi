const { registerUser, loginUser } = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({
            message: 'Usuario registrado con exito.',
            data: user
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

const login = async (req, res) => {
  try {
    const loginResult = await loginUser(req.body);

    res.status(200).json({
      message: 'Inicio de sesió exitoso.',
      data: loginResult
    });
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
};

module.exports = {
  register,
  login
};
