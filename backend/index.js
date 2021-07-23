const express = require('express');
const { recoverPersonalSignature } = require('eth-sig-util');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = 4000;

// FIXME This should be inside a dotenv file in production
const PRIVATE_JWT_SECRET = 'verybigandcoolsecret';

app.use(cors());
app.use(express.json());

app.get('/token', (_req, res) => {
  const nonce = Math.floor(Math.random() * 1000000).toString(); // in a real life scenario we would random this after each login and fetch it from the db as well
  return res.send(nonce);
});
app.post('/auth', (req, res) => {
  // Extract things from the request body
  const { address, signature, nonce } = req.body;

  // Recover address from the signature by using nonce as data
  const recoveredAddress = recoverPersonalSignature({
    data: nonce,
    sig: signature
  });

  if (recoveredAddress !== address) {
    return res.status(401).send();
  }

  // Create an authenticatioin token using JWT
  const authToken = jwt.sign(recoveredAddress, PRIVATE_JWT_SECRET);

  // Send the auth token
  res.send(authToken);
});

app.listen(port, () => {
  console.log(`Backend auth app listening at http://localhost:${port}`);
});
