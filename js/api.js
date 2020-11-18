// const proxyurl = "https://cors-anywhere.herokuapp.com/";
const base_url = "https://api.football-data.org/v2/";
const standData = `${base_url}competitions/2019/standings`
// url = url.replace(/^http:\/\//i, 'https://');

const fetchApi = function (url) {
  return fetch(url, {
    headers: {
      'X-Auth-Token': '91c73e0fc5544a5dabd3e74b2fcb9954'
    }
  });
}

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}


function getStandings() {
  return new Promise(function (resolve, reject) {
    if ('caches' in window) {
      caches.match(standData).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var standingsHTML = "";
            data.standings[0].table.forEach(function (team) {
              standingsHTML += `
              <div class="card">
              <a href="./standing.html?id=${team.team.id}">
                <div class="card-image waves-effect waves-block waves-light">
                    <img src=${team.team.crestUrl} alt=${team.team.name} style="padding-top: 20px"/>
                </div>
              </a>
              <div class="card-content">
                <span class="card-title truncate"><strong>${team.team.name}</strong></span>
                <p>Total Permainan: ${team.playedGames}</p>
                <table>
                  <tr>
                    <td>Menang: ${team.won}</td>
                    <td>Kalah: ${team.lost}</td>
                    <td>Seri: ${team.draw}</td>
                  </tr>
                </table>
              </div>
            </div>
          `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("standings").innerHTML = standingsHTML;
            resolve(data);
          })
        }
      })
    }
    fetchApi(standData)
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek/array JavaScript dari response.json() masuk lewat data.
        // Menyusun komponen card artikel secara dinamis
        var standingsHTML = "";
        data.standings[0].table.forEach(function (team) {
          standingsHTML += `
          <div class="card">
            <a href="./standing.html?id=${team.team.id}">
              <div class="card-image waves-effect waves-block waves-light">
                  <img src=${team.team.crestUrl} alt=${team.team.name} style="padding-top: 20px"/>
              </div>
            </a>
            <div class="card-content">
              <span class="card-title truncate"><strong>${team.team.name}</strong></span>
              <p>Total Permainan: ${team.playedGames}</p>
              <table>
                <tr>
                  <td>Menang: ${team.won}</td>
                  <td>Kalah: ${team.lost}</td>
                  <td>Seri: ${team.draw}</td>
                </tr>
              </table>
            </div>
          </div>
        `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("standings").innerHTML = standingsHTML;
        resolve(data);
      })
      .catch(error);
  }
  )
}

function getTeamById() {
  return new Promise(function (resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(`${base_url}teams/${idParam}`).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var teamHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.crestUrl}" alt="${data.name}"/>
              </div>
              <div class="card-content">
                <span class="card-title">${data.name}</span>
                ${snarkdown(data.shortName)}
              </div>
            </div>
          `;
            console.log('data name', data.name);
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = teamHTML;
            resolve(data);
          });
        }
      });
    }
    fetchApi(`${base_url}teams/${idParam}`)
      .then(status)
      .then(json)
      .then((data) => {
        console.log(data);
        let teamHTML = `
          <div class="card" style="margin-top: 10px;">
            <div class="card-image waves-effect waves-block waves-light" >
            <img src="${data.crestUrl}" alt=${data.name} style="padding-top: 20px;" />
            </div>
            <div class="card-content">
              <p class="card-title"><strong>${data.name}</strong></p>
              <p>${!data.address ? `-` : data.address}</p>
              <p>${!data.email ? `-` : data.email}</p>
              <a href="${data.website}" target="_blank">${data.website}</a>
              </div>
              <table>
                <tr>
                  <th>Pemain</th>
                  <th>Posisi</th>
                  <th>Negara asal</th>
                </tr>
              ${data.squad.map((player) =>
          `<tr>
                  <td><strong style="color:#2d2d2d">${player.name}</strong></td>
                  <td>${player.position}</td>
                  <td>${player.nationality}</td>
                </tr>`
        )}
              </table>
          </div >
          `;
        // `;
        document.getElementById("body-content").innerHTML = teamHTML;
        resolve(data);
      });
  })
}

function getSavedTeams() {
  return new Promise(function (resolve, reject) {
    getAll().then(function (standings) {
      // Menyusun komponen card artikel secara dinamis
      var standingsHTML = "";
      standings.forEach(function (team) {
        standingsHTML += `
          <div class="card">
          <button id="${team.id}" class="removeButton btn">Remove</button>
                      <a href="./standing.html?id=${team.id}">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${team.crestUrl}" alt=${team.name} style="padding-top: 20px"/>
                        </div>
                      </a>
                      <div class="card-content">
                        <h5>${team.name}</h5>
                        <span>${team.address}</span>
                        <span>${team.email}</span>
                        <span>${team.website}</span>
                      </div>
                      
                    </div> 
          `;
      });
      var standingsNull = "<p>Belum ada team favorite<p>"
      // Sisipkan komponen card ke dalam elemen dengan id #body-content
      // console.log('saved data', standings)
      // console.log('standingsHTML data', standingsHTML)
      document.getElementById("saved").innerHTML = standings.length < 1 ? standingsNull : standingsHTML;

      let removeButtons = document.querySelectorAll(".removeButton");
      for (let button of removeButtons) {
        button.addEventListener("click", function (event) {
          let id = event.target.id;
          console.log('ini id', id)
          M.toast({ html: 'Team Favorit telah dihapus' })
          dbDeleteTeam(id).then(() => {
            getSavedTeams()
          })
        })
      }
    });
  })
}

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then(function (data) {
    teamHTML = '';
    var teamHTML = `
          < div class="card" >
        <div class="card-image waves-effect waves-block waves-light">
        <img src="${data.crestUrl}" alt=${data.name}/>
        </div>
        <div class="card-content">
          <span class="card-title">${data.name}</span>
          ${snarkdown(data.website)}
        </div>
      </div >
          `;
    //Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamHTML;
    resolve(data);
  });
}