export async function handleIncomingMessage(userMessage, rawPayload) {
  const text = (userMessage || '').trim();

  if (!text) {
    return 'I’m here to support seniors in Abu Dhabi. How can I help today?';
  }

  const lower = text.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi')) {
    return 'Hello! I’m the SeniorConnect companion. Are you looking for social activities, walking options, or just someone to talk to?';
  }

  if (lower.includes('lonely') || lower.includes('alone')) {
    return 'I’m glad you reached out. You’re not alone. I can suggest nearby majlis, walking groups, or gentle activities—what area of Abu Dhabi are you in?';
  }

  if (lower.includes('walk') || lower.includes('mall')) {
    return 'Mall walking is a great low‑stress option. Tell me your district, and I’ll suggest a nearby mall and a simple walking plan.';
  }

  return 'I’m your SeniorConnect companion for Abu Dhabi seniors. Tell me your district and what you feel like—quiet majlis, gentle walking, or just a friendly chat.';
}
