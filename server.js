const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));

const conversaciones = {};

app.get('/', (req, res) => {
  res.send('Ventor24 activo');
});

app.all('/voice', (req, res) => {
  res.type('text/xml');
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Lupe-Neural" language="es-MX">Hola, soy Ventor24. En que puedo ayudarte hoy?</Say>
  <Gather input="speech" language="es-MX" speechTimeout="5" timeout="10" actionOnEmptyResult="false" action="/procesar" method="POST"></Gather>
  <Say voice="Polly.Lupe-Neural" language="es-MX">No escuche nada. Intentalo de nuevo.</Say>
</Response>`;
  res.send(twiml);
});

app.all('/procesar', async (req, res) => {
  res.type('text/xml');
  const texto = req.body.SpeechResult ? req.body.SpeechResult : '';
  const callSid = req.body.CallSid || 'default';
  console.log('Texto recibido: ' + texto);
  if (!conversaciones[callSid]) {
    conversaciones[callSid] = [
      { role: 'system', content: 'Eres Ventor24, un asistente de voz en espanol para negocios en Mexico. Responde breve y amable. Maximo 2 oraciones.' }
    ];
  }
  conversaciones[callSid].push({ role: 'user', content: texto });
  let respuestaIA = 'Lo siento, no pude procesar tu mensaje.';
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bearer ${process.env.OPENAI_API_KEY}
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: conversaciones[callSid],
        max_tokens: 150
      })
    });
    const data = await response.json();
    console.log('OpenAI raw:', JSON.stringify(data));
    respuestaIA = data.choices[0].message.content;
    console.log('Respuesta IA: ' + respuestaIA);
    conversaciones[callSid].push({ role: 'assistant', content: respuestaIA });
  } catch (error) {
    console.log('Error OpenAI:', error);
  }
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Lupe-Neural" language="es-MX">${respuestaIA}</Say>
  <Gather input="speech" language="es-MX" speechTimeout="5" timeout="10" actionOnEmptyResult="false" action="/procesar" method="POST"></Gather>
  <Say voice="Polly.Lupe-Neural" language="es-MX">Hay algo mas en que pueda ayudarte?</Say>
</Response>`;
  res.send(twiml);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto ' + PORT);
});
