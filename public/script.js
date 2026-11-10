
const coffeeGrid = document.getElementById("coffeeGrid");
const leaderboard = document.getElementById("leaderboard");

async function loadCoffees() {
  try {
    const response = await fetch("/api/coffees");
    const coffees = await response.json();

    coffeeGrid.innerHTML = "";

    coffees.forEach(coffee => {
      coffeeGrid.innerHTML += `
        <div class="coffee-card">
          <div class="coffee-emoji">${coffee.emoji}</div>
          <h3>${coffee.name}</h3>
          <p>${coffee.description}</p>
          <div class="vote-count">⭐ ${coffee.votes} Votes</div>
          <button onclick="vote(${coffee.id})">Vote Now</button>
        </div>
      `;
    });

    loadLeaderboard();
  } catch (error) {
    coffeeGrid.innerHTML = "Unable to load coffees.";
  }
}

async function vote(id) {
  try {
    const response = await fetch(`/api/vote/${id}`, {
      method: "POST"
    });

    if (!response.ok) throw new Error("Vote failed");

    await loadCoffees();
  } catch (error) {
    alert("Unable to submit vote. Try again!");
  }
}

async function loadLeaderboard() {
  const response = await fetch("/api/leaderboard");
  const coffees = await response.json();

  leaderboard.innerHTML = "";

  coffees.forEach((coffee, index) => {
    leaderboard.innerHTML += `
      <div class="leaderboard-item">
        <span>${index + 1}. ${coffee.emoji} ${coffee.name}</span>
        <strong>${coffee.votes} votes</strong>
      </div>
    `;
  });
}

loadCoffees();
