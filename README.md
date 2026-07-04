# Rwanda Cultural Archives

> Preserving and sharing Rwanda's rich cultural heritage — digitally.

---

## Problem Statement

Rwanda's cultural knowledge — traditions, oral histories, artifacts, and stories — risks being lost as it is scattered across physical archives, undocumented or inaccessible to the public. There is no centralized digital platform where Rwandans, researchers, and the diaspora can easily discover, explore, and contribute to this heritage.

## Target Users

- Rwandan students and researchers
- Cultural institutions and museums
- Rwandans in the diaspora
- International researchers studying African heritage

## Core Features

1. **Browse Archives** — Explore cultural items organized by category (art, music, traditions, history)
2. **View Item Details** — See descriptions, images, and historical context for each archive entry
3. **Search** — Find cultural items by keyword or category
4. **Submit a Cultural Item** — Community members can contribute new entries for review
5. **About / Contact** — Information about the platform and how to get involved

## Technology Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React.js, CSS           |
| Backend   | Node.js, Express        |
| Data      | JSON / MongoDB          |
| Dev Tools | Git, GitHub, VS Code    |

---

## Repository Structure

```
Formative_1-Advanced-Devops/
│
├── frontend/          # React frontend application
├── backend/           # Node.js/Express backend API
├── docs/              # Project documentation
├── .github/
│   └── CODEOWNERS     # Code ownership definitions
├── README.md
├── LICENSE
└── .gitignore
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/Formative_1-Advanced-Devops.git
cd Formative_1-Advanced-Devops

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running the Application

```bash
# Start the backend (from /backend)
npm start

# Start the frontend (from /frontend)
npm run dev
```

The app will be available at `http://localhost:3000`

---

## Development Workflow

All changes must go through a Pull Request — no direct pushes to `main`.

1. Create a feature branch from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes and commit with clear messages
3. Push the branch and open a Pull Request on GitHub
4. Request a review from your teammate
5. Address any review comments
6. Merge into `main` only after approval

---

## Contributing

See [CONTRIBUTING](docs/CONTRIBUTING.md) for guidelines on submitting issues, opening pull requests, and code style.

---

## Future Enhancements

- OCR support for scanned historical documents
- Multilingual support (Kinyarwanda, French, English)
- AI-powered semantic search across archives
- User accounts with bookmarks and collections
- Integration with national cultural institutions

---

## Team

| Name       | Role              | GitHub                          |
|------------|-------------------|---------------------------------|
| Abraham    | DevOps Lead       | [@abu00123](https://github.com/abu00123) |
| Olaniyi    | Developer         | [@olaniyiolufemi](https://github.com/olaniyiolufemi) |

---

## Docker Setup & Local Development

We use Docker Compose to run the backend, frontend, and PostgreSQL database seamlessly.

### Prerequisites

- Docker & Docker Compose installed locally

### Running the Application

Spin up all services with one command:

```bash
docker-compose up --build
```

| Service | URL |
|---------|-----|
| Frontend App | http://localhost:5173 |
| Backend API | http://localhost:5000/api/health |
| PostgreSQL | localhost:5432 |

### Testing and Linting Locally

```bash
# Run backend tests
npm test --prefix backend

# Run backend lint
npx oxlint backend/

# Run frontend lint
npm run lint --prefix frontend
```

---

## Team Participation Sheet

View our team participation, task allocation, and meeting notes here:
[Team Participation Sheet](https://docs.google.com/spreadsheets/d/1cYHDG9u3X2Wy7NVIemoLGoKACWh2QblRNxahBFGcwW4/edit?usp=sharing)

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
