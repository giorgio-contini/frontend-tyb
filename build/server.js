import express from 'express';
import path from 'path';
const app = express();
const PORT = process.env.PORT || 3000;
app.use('/static', express.static(path.join(__dirname, 'static')));
app.get('/manifest.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'manifest.json'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
