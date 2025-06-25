export default async function handler(req, res) {
  // CORS preflight 처리 (대소문자 구분 없이)
  if (req.method && req.method.toUpperCase() === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'POST') {
    const { id, password } = await req.json();
    // 실제로는 DB/시트에서 id, password 확인해야 함
    // 여기서는 임시로 무조건 성공 반환
    res.status(200).json({ success: true, name: id });
  } else {
    res.status(405).end();
  }
}
