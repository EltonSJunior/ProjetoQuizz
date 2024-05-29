const crypto = require('crypto');

export function hashPassword(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');
    return hashedPassword;
}

export function verificarSenha(senhaDigitada, senhaHash) {
    const hash = crypto.createHash('sha256');
    hash.update(senhaDigitada);
    const senhaHashada = hash.digest('hex');
    return senhaHashada === senhaHash;
}