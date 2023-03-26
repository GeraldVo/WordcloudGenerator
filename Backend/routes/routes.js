const express = require("express");
const createSocketServer = require("../server");
const router = express.Router();
const userRepository = require("../repositories/user");
const begriffRepository = require("../repositories/begriff");
const blacklistRepository = require("../repositories/blacklist");
const themeRepository = require("../repositories/theme");
const maskeRepository = require("../repositories/maske");
const umfrageRepository = require("../repositories/umfrage");
const authorizationHandler = require("../authorization/authorization");

const port = process.env.PORT || 3001;
let io, server, lastCreatedUmfrageID;

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Retrieve user information from the database
  userRepository.getUser(username, (user, error) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error getting Users");
      return;
    } else if (user[0].password == password) {
      // Generate a JWT token
      const token = authorizationHandler.generateToken(user[0].benutzerID);

      req.session.user = { username }; // store the user's username in the session
      // Return the token to the client
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect("localhost:3002/logout.html");
    }
  });
});

router.get("/user", function (req, res) {
  userRepository.getAllUsers((user, error) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error getting Users");
      return;
    }
    res.status(200).send(user);
  });
});

router.post("/user", function (req, res) {
  const { name, password } = req.body;
  userRepository.insertUser(name, password, "lecturer", (user, error) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error inserting User");
      return;
    }
    res.status(200).send(user);
  });
});

router.get("/umfrage", function (req, res) {
  umfrageRepository.getAllUmfragen((umfragen, error) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error getting Umfragen");
      return;
    }
    res.status(200).send(umfragen);
  });
});

router.get("/umfrage/:umfrageid", function (req, res) {
  const umfrageID = req.params.umfrageid;
  umfrageRepository.getCurrentUmfrage(umfrageID, (umfrage, error) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error getting Umfrage with ID: " + umfrageID);
      return;
    }
    res.status(200).send(umfrage);
  });
});

router.post("/umfrage", function (req, res) {
  const {
    name,
    teilnehmerAnzahl,
    maxBegriffeTeilnehmer,
    zeitlimit,
    umfrageCode,
    themeID,
    maskeID,
    schriftartID,
    hintergrundfarbe,
    erstellerID,
  } = req.body;

  umfrageRepository.insertUmfrage(
    name,
    teilnehmerAnzahl,
    maxBegriffeTeilnehmer,
    zeitlimit,
    umfrageCode,
    themeID,
    maskeID,
    schriftartID,
    hintergrundfarbe,
    erstellerID,
    (umfrage, error) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error inserting umfrage");
        return;
      }
      console.log("InsertID: " + umfrage.insertId);
      lastCreatedUmfrageID = umfrage.insertId;
      res.status(200).send(umfrage);
    }
  );
});

router.post("/begriff", function (req, res) {
  const { begriff, umfrageID } = req.body;
  begriffRepository.insertBegriff(begriff, umfrageID, (begriff, error) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error inserting Begriff");
      return;
    }
    res.status(200).send(begriff);
  });
});

router.get("/begriff", function (req, res) {
  console.log("Test");
  res.status(200);
});

router.get("/begriff/:umfrageid", function (req, res) {
  const umfrageID = req.params.umfrageid;
  console.log("endpoint begriff/umfrage id reached");
  begriffRepository.getAllBegriffFromUmfrage(umfrageID, (user, error) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error getting Begriffe zu Umfrage: " + umfrageID);
      return;
    }
    res.status(200).send(user);
  });
});

router.get("/blacklist", authorizationHandler.authorize, function (req, res) {
  blacklistRepository.getAllBlacklistEntries((blacklistEntry, error) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error getting BlacklistEntries");
      return;
    }
    return res.status(200).send(blacklistEntry);
  });
});

router.post("/blacklist", function (req, res) {
  const { name } = req.body;
  blacklistRepository.insertBlacklistEntry(name, (blacklistEntry, error) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error inserting User");
      return;
    }
    return res.status(200).send(blacklistEntry);
  });
});

router.get("/maske", function (req, res) {
  maskeRepository.getAllMasken((maske, error) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error getting masken");
      return;
    }
    return res.status(200).send(maske);
  });
});

router.post("/maske", function (req, res) {
  const { name, bild } = req.body;
  maskeRepository.insertMaske(name, bild, (maske, error) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error inserting maske");
      return;
    }
    return res.status(200).send(maske);
  });
});

router.get("/theme", function (req, res) {
  themeRepository.getAllThemes((theme, error) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error getting theme");
      return;
    }
    return res.status(200).send(theme);
  });
});

router.post("/theme", function (req, res) {
  const { name, farbe1, farbe2, farbe3, farbe4 } = req.body;
  themeRepository.insertTheme(
    name,
    farbe1,
    farbe2,
    farbe3,
    farbe4,
    (theme, error) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error inserting theme");
        return;
      }
      return res.status(200).send(theme);
    }
  );
});

router.get("/startumfrage", function (req, res) {
  const joinCode = req.query.joinCode;
  console.log("startumfrage UmfrageID: " + lastCreatedUmfrageID);
  const { io, server } = createSocketServer(joinCode, lastCreatedUmfrageID);

  server.listen(port, () => {
    console.log(`Socket.io server listening on port ${port}`);
  });
  res.send("Socket.io server started");
});

router.get("/stopumfrage", function (req, res) {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
    res.send('Server stopped');
  } else {
    res.send('Error: server is not running');
  }
});

module.exports = router;
