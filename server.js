import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { handleIncomingMessage } from './src/agent.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('SeniorConnect Agent backend is running.');
});

app.post('/webhook', async (req, res) => {
  try {
    const payload = req.body;
    console.log('Incoming payload:', JSON.stringify(payload, null, 2));

    const userMessage =
      payload.message ||
      payload.text ||
      payload.body ||
      '';

    const reply = await handleIncomingMessage(userMessage, payload);

    return res.json({
      success: true,
      reply,
    });
  } catch (err) {
    console.error('Error in /webhook:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

app.listen(PORT, () => {
  console.log(`SeniorConnect Agent listening on port 3000`);
});
