const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cors = require('cors');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.send('Backend ya CV iko live ✅');
});

// Route ya kupokea application
app.post('/apply', upload.single('cv'), async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Application mpya: ${name}`,
      text: `Jina: ${name}\nEmail: ${email}\nSimu: ${phone}`,
      attachments: [{
        filename: req.file.originalname,
        content: req.file.buffer
      }]
    });

    res.json({ success: true, message: 'CV imetumwa!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
