// api/teacher-signup.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { id, name, password } = req.body;
    res.status(200).json({ success: true, id, name });
  } else {
    res.status(405).end();
  }
}
