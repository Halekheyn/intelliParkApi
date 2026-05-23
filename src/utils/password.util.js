const bcrypt = require('bcrypt');

const SALT_ROUND = 10;

const hashPassword = async (plainPassword) => {
    return await bcrypt.hash(plainPassword, SALT_ROUND)
}

module.exports = {
    hashPassword
}
