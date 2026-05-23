const { findUserByUserEmail, createUser } = require('../database/users.db');
const { hashPassword } = require('../utils/password.util');

const registerUser = async (userData) => {
    const { user_first_name, user_last_name, user_email, 
            user_password, user_role } = userData;

    if (!user_first_name || !user_last_name || !user_email 
        || !user_password || !user_role) {
        
        throw new Error('Nombre, Apellido, Correo, Contraseña y Role son requeridos.');
    }

    const existingUser = await findUserByUserEmail(user_email);

    if (existingUser) {
        throw new Error('El correo electrónico ya esta registrado.');
    }

    const user_password_hash = await hashPassword(user_password);

    const newUser = await createUser({
        user_first_name,
        user_last_name,
        user_email,
        user_password_hash,
        user_role
    });

    return newUser;
}

module.exports = {
  registerUser
};
