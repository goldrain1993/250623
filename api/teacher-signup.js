export default async function handler(req, res) {
  // CORS preflight 처리
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'POST') {
    let body = req.body;
    // Vercel Node.js 환경에서는 body가 자동 파싱 안될 수 있음
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }
    const { id, name, password } = body;
    res.status(200).json({ success: true, id, name });
  } else {
    res.status(405).end();
  }
}
