import express from 'express';
import path from 'path';
const app = express();
// Definisci la porta su cui il server ascolter�
const PORT = process.env.PORT || 3000;
// Configura Express per servire i file statici dalla directory 'build'
app.use('/static', express.static(path.join(__dirname, '../build/static')));
// Aggiungi una route per il manifest
app.get('/manifest.json', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'manifest.json'));
});
// Configura la route per la pagina principale
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
// Avvia il server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
