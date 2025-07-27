require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/api/auth/mobile', (req, res) => {
  const { appKey } = req.body;
  const secret = process.env.MOBILE_APP_SECRET;

  if (!appKey) {
    return res.status(400).json({ error: 'Missing appKey' });
  }

  if (appKey === secret) {
    return res.json({ success: true, message: 'Authenticated!' });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid appKey' });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
