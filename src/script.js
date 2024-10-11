const playerNameInput = document.querySelector("#name");
const avatarURLInput = document.querySelector("#url");
const error = document.querySelector(".error");

const playersList = [
  {
    id: 1,
    avatar:
      "https://1.bp.blogspot.com/-8X8q3tDK6Ls/Ux4Z_8g14VI/AAAAAAAABGs/_E8m8c694LQ/s1600/094Gengar.png",
    name: "Paulo",
    victories: 0,
    draws: 0,
    loss: 0,
    points: 0
  },
  {
    id: 2,
    avatar:
      "https://i1.wp.com/www.multarte.com.br/wp-content/uploads/2019/03/001bulbasaur_pokemon_mystery_dungeon_explorers_of_sky.png?fit=696%2C661&ssl=1",
    name: "Rafaela",
    victories: 0,
    draws: 0,
    loss: 0,
    points: 0
  },
  {
    id: 3,
    avatar:
      "https://i0.wp.com/www.multarte.com.br/wp-content/uploads/2019/03/pokemon2.png?resize=500%2C313&ssl=1",
    name: "Guilherme",
    victories: 0,
    draws: 0,
    loss: 0,
    points: 0
  }
];

updateDisplayedPlayers();

function updateDisplayedPlayers() {
  const tbody = document.querySelector("tbody");

  tbody.innerHTML = "";

  playersList.forEach((player) => {
    const playerRow = createPlayerRow(
      player.id,
      player.avatar,
      player.name,
      player.victories,
      player.draws,
      player.loss,
      player.points
    );

    tbody.appendChild(playerRow);
  });
}

function addVictory(id) {
  playersList.forEach((player) => {
    if (id === player.id) {
      player.victories++;
      player.points += 3;
      return;
    }

    player.loss++;
  });

  updateDisplayedPlayers();
}

function addDraw(id) {
  playersList.forEach((player) => {
    player.draws++;
    player.points++;
  });

  updateDisplayedPlayers();
}

function clearPlayerStats(id) {
  playersList.forEach((player) => {
    if (id === player.id) {
      player.victories = 0;
      player.draws = 0;
      player.loss = 0;
      player.points = 0;
    }
  });

  updateDisplayedPlayers();
}

function createPlayerRow(
  id,
  avatarURL,
  name,
  victories,
  draws,
  loss,
  totalPoints
) {
  const playerRow = document.createElement("tr");

  const playerTd = document.createElement("td");
  const victoryTd = document.createElement("td");
  const drawTd = document.createElement("td");
  const clearTd = document.createElement("td");
  const pointsTd = document.createElement("td");

  const avatarImg = document.createElement("img");
  const playerName = document.createElement("span");

  avatarImg.src = avatarURL;
  playerName.textContent = name;

  playerTd.appendChild(avatarImg);
  playerTd.appendChild(playerName);

  victoryTd.textContent = victories;
  drawTd.textContent = draws;
  clearTd.textContent = loss;
  pointsTd.textContent = totalPoints;

  const victoryButtonTd = document.createElement("td");
  const drawButtonTd = document.createElement("td");
  const clearButtonTd = document.createElement("td");

  victoryButtonTd.setAttribute("class", "td-button");
  drawButtonTd.setAttribute("class", "td-button");
  clearButtonTd.setAttribute("class", "td-button");

  const victoryButton = document.createElement("button");
  const drawButton = document.createElement("button");
  const clearButton = document.createElement("button");

  victoryButton.textContent = "Vitória";
  drawButton.textContent = "Empate";
  clearButton.textContent = "Zerar";

  victoryButton.setAttribute("onclick", `addVictory(${id})`);
  drawButton.setAttribute("onclick", `addDraw(${id})`);
  clearButton.setAttribute("onclick", `clearPlayerStats(${id})`);

  victoryButtonTd.appendChild(victoryButton);
  drawButtonTd.appendChild(drawButton);
  clearButtonTd.appendChild(clearButton);

  playerRow.appendChild(playerTd);
  playerRow.appendChild(victoryTd);
  playerRow.appendChild(drawTd);
  playerRow.appendChild(clearTd);
  playerRow.appendChild(pointsTd);
  playerRow.appendChild(victoryButtonTd);
  playerRow.appendChild(drawButtonTd);
  playerRow.appendChild(clearButtonTd);

  return playerRow;
}

clearAll.addEventListener("click", () => {
  playersList.forEach((player) => clearPlayerStats(player.id));
});

class Player {
  constructor(name, url) {
    this.id = playersList.length + 1;
    this.avatar = url;
    this.name = name;
    this.victories = 0;
    this.draws = 0;
    this.loss = 0;
    this.points = 0;
  }
}

addPlayerBtn.addEventListener("click", () => {
  const playerName = playerNameInput.value;
  const avatarURL = avatarURLInput.value;

  if (!verifyParameters(playerName, avatarURL)) {
    return;
  }

  const newPlayer = new Player(playerName, avatarURL);

  playersList.push(newPlayer);

  updateDisplayedPlayers();

  error.textContent = "";
  playerNameInput.value = "";
  avatarURLInput.value = "";
});

function verifyParameters(name, url) {
  if (!name) {
    error.textContent = "Insira um nome para adicionar um jogador.";
    return false;
  }

  if (
    !(url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".jpeg"))
  ) {
    error.textContent =
      "Insira um link válido (.jpg, .png ou .jpeg) para adicionar um jogador.";
    return false;
  }

  return true;
}
