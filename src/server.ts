import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Servire i file statici
app.use('/static', express.static(path.join(__dirname, 'static')));

// Servire il manifest
app.get('/manifest.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'manifest.json'));
});

// Gestire tutte le altre richieste
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
