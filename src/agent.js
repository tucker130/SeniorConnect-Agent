import axios from "axios";

export async function handleIncomingMessage(userMessage, rawPayload) {
  const text = (userMessage || '').trim();

  // 1. Your existing SeniorConnect logic
  let reply = '';

  if (!text) {
    reply = 'I’m here to support seniors in Abu Dhabi. How can I help today?';
  } else {
    const lower = text.toLowerCase();

    if (lower.includes('hello') || lower.includes('hi')) {
      reply = 'Hello! I’m the SeniorConnect companion. Are you looking for social activities, walking options, or just someone to talk to?';
    } else if (lower.includes('lonely') || lower.includes('alone')) {
      reply = 'I’m glad you reached out. You’re not alone. I can suggest nearby majlis, walking groups, or gentle activities—what area of Abu Dhabi are you in?';
    } else if (lower.includes('walk') || lower.includes('mall')) {
      reply = 'Mall walking is a great low‑stress option. Tell me your district, and I’ll suggest a nearby mall and a simple walking plan.';
    } else {
      reply = 'I’m your SeniorConnect companion for Abu Dhabi seniors. Tell me your district and what you feel like—quiet majlis, gentle walking, or just a friendly chat.';
    }
  }

  // 2. Extract WhatsApp sender number from Twilio payload
  const userPhone = rawPayload.From?.replace("whatsapp:", "");

  // 3. Send reply back to WhatsApp via Twilio
  if (userPhone) {
    await sendWhatsAppReply(userPhone, reply);
  }

  // 4. Return reply for server logs
  return reply;
}

// Helper function to send WhatsApp messages via Twilio
async function sendWhatsAppReply(to, message) {
  const TWILIO_SID = process.env.TWILIO_SID;
  const TWILIO_TOKEN = process.env.TWILIO_TOKEN;
  const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER;

  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`;

  return axios.post(
    url,
    new URLSearchParams({
      To: `whatsapp:${to}`,
      From: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`,
      Body: message,
    }),
    {
      auth: {
        username: TWILIO_SID,
        password: TWILIO_TOKEN,
      },
    }
  );
}
