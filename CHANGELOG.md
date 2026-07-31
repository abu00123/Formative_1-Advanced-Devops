# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Added
- Terraform infrastructure: VPC, public/private/DB subnets, IGW, route table
- Bastion host, app VM (private subnet), RDS PostgreSQL 16 (db.t3.micro)
- ECR repository (`rwanda-cultural-archives`) with scan-on-push enabled
- Three security groups: bastion (SSH public), web (SSH from bastion), RDS (5432 from web)
- CI pipeline (`ci.yml`): lint, tests, Docker build, npm audit, tfsec, Trivy scanning
- CD pipeline (`cd.yml`): build & push backend image to ECR, deploy via Ansible over bastion SSH
- `Dockerfile` with multi-stage build (base, backend, frontend) using `node:24-alpine`
- `docker-compose.yml` for local development (frontend, backend, PostgreSQL)
- `terraform/README.md` documenting infrastructure setup and teardown
- `CHANGELOG.md` (this file)

### Changed
- Base Docker image upgraded from `node:20-slim` to `node:24-alpine` to reduce CVEs
- Technology stack updated: PostgreSQL replaces JSON/MongoDB, added Docker/ECR, Terraform, Ansible, GitHub Actions
- README updated with CI/CD pipeline section, AWS infrastructure table, and updated repo structure

### Security
- `npm audit --audit-level=high` enforced in CI — no high/critical vulnerabilities
- `tfsec --minimum-severity CRITICAL` enforced in CI
- Trivy container scan enforced in CI — exits on CRITICAL severity
- `backend/node_modules` removed from git tracking (`.gitignore` updated)
- `terraform.tfvars` and `*.tfstate` files gitignored to prevent secret/state leakage

---

## [0.1.0] — Initial Release

### Added
- React frontend with browse, search, item detail, and submission pages
- Node.js/Express backend API
- PostgreSQL database schema with migrations and seed data
- Docker Compose local development setup
- GitHub Actions CI skeleton
- `CONTRIBUTING.md`, `CODEOWNERS`, `LICENSE`
