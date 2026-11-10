# ☕ Coffee Rating Application

A simple and interactive web application that allows users to explore different coffee varieties, vote for their favourites, and view a live leaderboard based on ratings.

## 🚀 Features

- Display different coffee varieties in a responsive grid.
- Vote for your favourite coffee.
- Automatically update vote counts.
- Store votes using SQLite database.
- Maintain vote counts even after page refresh.
- Display a leaderboard of top-rated coffees.
- Responsive and user-friendly interface.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- SQLite (SQL.js)

## 📂 Project Structure

```text
coffee-rating-app/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
├── package-lock.json
└── .gitignore
```

## ⚙️ Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/durgadevid500/coffee-rating-app.git
```

2. Navigate to the project folder:

```bash
cd coffee-rating-app
```

3. Install dependencies:

```bash
npm install
```

4. Start the application:

```bash
node server.js
```

5. Open your browser:

```text
http://localhost:3000
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/coffees` | Get all coffees |
| POST | `/api/vote/:id` | Vote for a coffee |
| GET | `/api/leaderboard` | Get coffee leaderboard |

## 💡 Project Objective

The objective of this project is to build an interactive web application using frontend technologies and a Node.js backend, demonstrating REST API integration, voting functionality, and database persistence.

## 👩‍💻 Author

**Durga Devi**

GitHub: [durgadevid500](https://github.com/durgadevid500)
