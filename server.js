
const express = require("express");
const fs = require("fs");
const path = require("path");
const initSqlJs = require("sql.js");

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, "coffee.db");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const coffees = [
  { id: 1, name: "Cappuccino", description: "Rich espresso with steamed milk", emoji: "☕" },
  { id: 2, name: "Latte", description: "Smooth coffee with creamy milk", emoji: "🥛" },
  { id: 3, name: "Espresso", description: "Strong and bold coffee", emoji: "🫘" },
  { id: 4, name: "Mocha", description: "Chocolate flavoured coffee", emoji: "🍫" },
  { id: 5, name: "Americano", description: "Classic black coffee", emoji: "🖤" },
  { id: 6, name: "Cold Coffee", description: "Refreshing chilled coffee", emoji: "🧊" }
];

async function startServer() {
  const SQL = await initSqlJs();
  const db = fs.existsSync(DB_PATH)
    ? new SQL.Database(fs.readFileSync(DB_PATH))
    : new SQL.Database();

  db.run(`CREATE TABLE IF NOT EXISTS coffees (
    id INTEGER PRIMARY KEY,
    name TEXT,
    description TEXT,
    emoji TEXT,
    votes INTEGER DEFAULT 0
  )`);

  coffees.forEach(c => {
    db.run(
      `INSERT OR IGNORE INTO coffees
       (id, name, description, emoji, votes)
       VALUES (?, ?, ?, ?, 0)`,
      [c.id, c.name, c.description, c.emoji]
    );
  });

  function saveDB() {
    fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
  }

  saveDB();

  function getCoffees() {
    return db.exec("SELECT * FROM coffees ORDER BY id")[0].values.map(row => ({
      id: row[0],
      name: row[1],
      description: row[2],
      emoji: row[3],
      votes: row[4]
    }));
  }

  app.get("/api/coffees", (req, res) => {
    res.json(getCoffees());
  });

  app.post("/api/vote/:id", (req, res) => {
    const id = Number(req.params.id);
    const coffee = getCoffees().find(c => c.id === id);

    if (!coffee) {
      return res.status(404).json({ message: "Coffee not found" });
    }

    db.run("UPDATE coffees SET votes = votes + 1 WHERE id = ?", [id]);
    saveDB();

    res.json({
      message: "Vote recorded!",
      coffee: getCoffees().find(c => c.id === id)
    });
  });

  app.get("/api/leaderboard", (req, res) => {
    res.json(getCoffees().sort((a, b) => b.votes - a.votes));
  });

  app.listen(PORT, () => {
    console.log(`Coffee Rating App: http://localhost:${PORT}`);
    console.log("SQLite database connected successfully!");
  });
}

startServer().catch(console.error);
