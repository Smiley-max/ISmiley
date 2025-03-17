// Initialiser Parse Backend
Parse.initialize("1Ubt8EkAiPCEFSsINWoEwrSYe9YMcFBKPRgft7EO", "TXKynJNjvxRbefkdOgRCVOmHMXO4hZE0GCkvUdMz");
Parse.serverURL = "https://parseapi.back4app.com";

// Funktion til at oprette en bruger
function signUp(event) {
  event.preventDefault();
  let user = new Parse.User();
  user.set("username", document.getElementById("username").value);
  user.set("password", document.getElementById("password").value);
  user.set("email", document.getElementById("email").value);

  user.signUp()
    .then(() => {
      alert("Konto oprettet! Log ind nu.");
      window.location.href = "login.html";
    })
    .catch(error => alert("Fejl: " + error.message));
}

// Funktion til at logge ind
function logIn(event) {
  event.preventDefault();
  Parse.User.logIn(
    document.getElementById("username").value,
    document.getElementById("password").value
  )
    .then(user => {
      alert("Velkommen, " + user.get("username") + "!");
      window.location.href = "desktop.html";
    })
    .catch(error => alert("Fejl: " + error.message));
}
