const crypto = require('crypto');

const generateKeyPair = () => {
    return crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });
};

const signData = (privateKey, data) => {
    const sign = crypto.createSign('SHA256');
    sign.update(data);
    sign.end();
    return sign.sign(privateKey, 'hex');
};

const verifySignature = (publicKey, data, signature) => {
    const verify = crypto.createVerify('SHA256');
    verify.update(data);
    verify.end();
    return verify.verify(publicKey, signature, 'hex');
};

module.exports = { generateKeyPair, signData, verifySignature };
