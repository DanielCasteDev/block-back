const express = require('express');
const bodyParser = require('body-parser');
const blockchainRoutes = require('./routes/blockchain');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());


app.use(cors());

// Rutas
app.use('/blockchain', blockchainRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
