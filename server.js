
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { email } = req.body;
  if(!email) return res.status(400).json({error: 'Email inahitajika'});

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Test kutoka Backend yako',
      text: 'Hongera! Backend yako ya Render inafanya kazi sasa ✅'
    });

    res.json({message: 'Email imetumwa kwa ' + email});
  } catch(error) {
    res.status(500).json({error: error.message});
  }
});

app.get('/', (req, res) => res.send('Backend iko hai!'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
