const express = require('express');
const { Block, Blockchain } = require('../models/blockchain');
const { generateKeyPair, signData, verifySignature } = require('../utils/cryptography');

const router = express.Router();
const myBlockchain = new Blockchain();
const { publicKey, privateKey } = generateKeyPair();

// Obtener la cadena completa
router.get('/chain', (req, res) => {
    res.json(myBlockchain.chain);
});

// Agregar un nuevo bloque
router.post('/add-block', (req, res) => {
    const { data } = req.body;

    if (!data) return res.status(400).json({ error: 'Data is required' });

    const index = myBlockchain.chain.length;
    const timestamp = Date.now();
    const previousHash = myBlockchain.getLatestBlock().hash;

    // Crear un nuevo bloque como instancia de Block
    const newBlock = new Block(index, timestamp, data, previousHash);

    // Firmar los datos
    newBlock.signature = signData(privateKey, JSON.stringify(newBlock));

    // Agregar el bloque a la cadena
    myBlockchain.addBlock(newBlock);

    res.json({ message: 'Block added', chain: myBlockchain.chain });
});

// Verificar la validez de la cadena
router.post('/verify-chain', (req, res) => {
    const isValid = myBlockchain.isChainValid();
    res.json({ isValid });
});

// Verificar la firma de un bloque
router.post('/verify-signature', (req, res) => {
    const { data, signature } = req.body;

    if (!data || !signature) {
        return res.status(400).json({ error: 'Data and signature are required' });
    }

    const isVerified = verifySignature(publicKey, JSON.stringify(data), signature);
    res.json({ isVerified });
});

module.exports = router;
