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

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Frontend    | React.js, CSS                     |
| Backend     | Node.js, Express                  |
| Database    | PostgreSQL (AWS RDS)               |
| Container   | Docker, Amazon ECR                |
| Infra       | Terraform, AWS (VPC, EC2, RDS)    |
| CI/CD       | GitHub Actions                    |
| Config Mgmt | Ansible                           |
| Dev Tools   | Git, GitHub, VS Code              |

---

## Repository Structure

```
Formative_1-Advanced-Devops/
│
├── frontend/          # React frontend application
├── backend/           # Node.js/Express backend API
├── terraform/         # AWS infrastructure (VPC, EC2, RDS, ECR)
├── ansible/           # Deployment playbooks
├── docs/              # Project documentation
├── .github/
│   ├── workflows/     # CI/CD pipelines (ci.yml, cd.yml)
│   └── CODEOWNERS     # Code ownership definitions
├── Dockerfile
├── docker-compose.yml
├── CHANGELOG.md
├── README.md
├── LICENSE
└── .gitignore
```

---

## Getting Started

### Prerequisites

- Node.js v24+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/abu00123/Formative_1-Advanced-Devops.git
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

## CI/CD Pipeline

Two GitHub Actions workflows handle automation:

| Workflow | Trigger | Jobs |
|----------|---------|------|
| `ci.yml` | Push / PR to any branch | Lint, test, Docker build, security scan (npm audit, tfsec, Trivy) |
| `cd.yml` | Push to `main` | Build & push image to ECR, deploy via Ansible over bastion SSH |

Required GitHub Secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `BASTION_IP`, `APP_VM_IP`, `SSH_PRIVATE_KEY`.

---

## Architecture

```
                        ┌─────────────────────────────────────────────────────┐
                        │                   AWS us-east-1                     │
                        │                                                     │
  Developer             │   ┌─────────────┐        ┌──────────────────────┐  │
  git push ────────────►│   │Public Subnet│        │   Private Subnet     │  │
       │                │   │             │  SSH   │                      │  │
       │                │   │  Bastion    │───────►│     App VM (EC2)     │  │
       │                │   │  Host (EC2) │        │   Docker Container   │  │
       ▼                │   └─────────────┘        │   Node.js Backend    │  │
  GitHub Actions        │                          └──────────┬───────────┘  │
  ┌──────────────┐      │   ┌─────────────┐                   │              │
  │  CI Pipeline │      │   │  Amazon ECR │◄──── push image   │              │
  │  - lint      │      │   │  (registry) │                   │              │
  │  - test      │      │   └─────────────┘              ┌────▼─────────┐   │
  │  - tfsec     │      │                                │  DB Subnet   │   │
  │  - trivy     │      │                                │  RDS Postgres│   │
  └──────┬───────┘      │                                └──────────────┘   │
         │              └─────────────────────────────────────────────────────┘
         ▼
  CD Pipeline
  - push to ECR
  - ansible deploy
    via bastion SSH
```

---

## Live Application

> **URL:** `http://<BASTION_IP>:5000/api/health` *(update after deployment)*

---

## AWS Infrastructure

Provisioned via Terraform in `us-east-1`:

| Resource | Details |
|----------|---------|
| VPC | 10.0.0.0/16 |
| Public Subnet | Bastion host |
| Private Subnet | App VM (backend) |
| DB Subnet | RDS PostgreSQL 16 (db.t3.micro) |
| ECR | `rwanda-cultural-archives` |
| Bastion SG | SSH from internet |
| Web SG | SSH from bastion only |
| RDS SG | Port 5432 from web SG only |

See [`terraform/README.md`](terraform/README.md) for setup and teardown instructions.

---

## Team Participation Sheet

View our team participation, task allocation, and meeting notes here:
[Team Participation Sheet](https://docs.google.com/spreadsheets/d/1cYHDG9u3X2Wy7NVIemoLGoKACWh2QblRNxahBFGcwW4/edit?usp=sharing)

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
