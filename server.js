const next = require("next");
const express = require("express");
const axios = require("axios");
const cookierParser = require("cookie-parser");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({ dev });
const handler = app.getRequestHandler();

const AUTH_TYPE = "authenticated";
const COOKIE_SECRET = "adsaionobuosaodio";
const COOKIE_OPTS = {
  httpOnly: true,
  signed: true,
  secure: !dev
};

const authenticate = async (email, password) => {
  const { data } = await axios.get("http://jsonplaceholder.typicode.com/users");
  return data.find(user => {
    if (user.email === email && user.website === password) {
      return user;
    }
  });
};

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  server.use(cookierParser(COOKIE_SECRET));

  server.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await authenticate(email, password);
    if (!user) {
      res.status(403).send("UnAuthorized Email and/or Password does not match");
    }

    const userData = {
      name: user.name,
      email: user.email,
      type: AUTH_TYPE
    };

    res.cookie("token", userData, COOKIE_OPTS);
    res.json(userData);
  });

  server.post("/api/logout", (req, res) => {
    res.clearCookie("token", COOKIE_OPTS);
    res.sendStatus(204);
  });

  server.get("/api/profile", async (req, res) => {
    const { signedCookies = {} } = req;
    const { token } = signedCookies;
    if (token && token.email) {
      const { data } = await axios.get(
        "http://jsonplaceholder.typicode.com/users"
      );
      const userProfile = data.filter(user => user.email === token.email);
      return res.json({ user: userProfile });
    }
    res.status(404).send("Unauthorized access please login.");
  });

  server.get("*", (req, res) => {
    return handler(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`listening on port: ${port}`);
  });
});
