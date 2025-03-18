// Funktion til at gemme spillerens niveau i databasen
function saveLevelToDatabase(level) {
  const user = Parse.User.current();
  if (!user) {
    alert("Du skal være logget ind for at gemme dine fremskridt!");
    return;
  }

  const userId = user.id;
  const query = new Parse.Query(Parse.User);
  query.equalTo("objectId", userId);

  query.first().then(userRecord => {
    if (userRecord) {
      // Hent tidligere niveauer, hvis de findes, ellers opret et tomt array
      let levelsCompleted = userRecord.get("LevelSmileyAdventure") || [];

      // Hvis spilleren ikke allerede har gennemført dette niveau, tilføj det
      if (!levelsCompleted.includes(level)) {
        levelsCompleted.push(level);
      }

      // Opdater spillerens fremskridt i databasen
      userRecord.set("LevelSmileyAdventure", levelsCompleted);
      return userRecord.save();
    }
  }).then(() => {
    console.log('Niveau gemt i database!');
    alert("Dit niveau er blevet gemt!");
  }).catch(error => {
    console.error('Fejl ved opdatering af niveau: ', error.message);
    alert("Fejl ved opdatering af niveau: " + error.message);
  });
}

// Funktion til at hente spillerens fremskridt
function loadPlayerProgress() {
  const user = Parse.User.current();
  if (!user) {
    alert("Du skal være logget ind for at hente dine fremskridt!");
    return;
  }

  const userId = user.id;
  const query = new Parse.Query(Parse.User);
  query.equalTo("objectId", userId);

  query.first().then(userRecord => {
    if (userRecord) {
      const levelsCompleted = userRecord.get("LevelSmileyAdventure");
      if (levelsCompleted && levelsCompleted.length > 0) {
        console.log("Du har gennemført niveau(er): " + levelsCompleted.join(", "));
      } else {
        console.log("Du har ikke gennemført nogen niveauer endnu.");
      }
    }
  }).catch(error => {
    console.error("Fejl ved hentning af niveau: ", error.message);
  });
}

// Kald funktionen for at hente spillerens fremskridt, når du ønsker at vise det
// loadPlayerProgress(); // Kan kaldes på en passende måde i dit spil
