var dbPromised = idb.open("footballinfo", 1, function (upgradeDb) {
  var teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("team_name", "team_name", { unique: false });
});

function saveForLater(team) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Team Favorit telah ditambahkan.");
      // M.toast({ html: 'Team Favorit telah ditambahkan.' })
    });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function (teams) {
        resolve(teams);
      });
  });
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(parseInt(id))
      })
      .then(function (team) {
        resolve(team);
      });
  });
}

function dbDeleteTeam(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        store.delete(parseInt(id));
        return store.complete;
      })
      .then(function () {
        console.log("Team Favorit telah dihapus.");
      });
  });
}
// const dbDeleteTeam = id => {
//   return new Promise((resolve, reject) => {
//     dbPromised.then(db => {
//       const transaction = db.transaction("teams", `readwrite`);
//       transaction.objectStore("teams").delete(id);
//       return transaction;
//     }).then(transaction => {
//       if (transaction.complete) {
//         resolve(true)
//       } else {
//         reject(new Error(transaction.onerror))
//       }
//     })
//   })
// };