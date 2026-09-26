# ItinerAIry ✈️

ItinerAIry is a work-in-progress travel planner that generates personalised, day-by-day itineraries from a destination, budget, interests, pace, and group size.

This project is also a hands-on way for me to learn cloud administration. I’m currently studying for the Azure Administrator Associate certification and plan to build the cloud-hosted version on Microsoft Azure.

> **Project status:** The React frontend and FastAPI backend run locally. The project is moving to an Azure-first setup, with Azure OpenAI planned for itinerary generation. Cloud hosting and other Azure services are part of the implementation roadmap.

## Current stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Python, FastAPI, Pydantic
- **AI:** Azure OpenAI (planned for itinerary generation)
- **Database:** None yet; PostgreSQL is a possible future addition if the app needs saved trips or accounts

## Azure learning and deployment plan

The goal is to migrate in small, useful steps and document the Azure decisions as I go:

1. Create a resource group and use tags, RBAC, and a budget to practise Azure resource management safely.
2. Deploy the FastAPI backend to **Azure App Service** or **Azure Container Apps**.
3. Host the Vite-built frontend on **Azure Static Web Apps**.
4. Move secrets out of local configuration and into **Azure Key Vault**; use managed identity where supported.
5. Add **Azure Monitor** and Application Insights for logs and basic observability.
6. Optionally evaluate **Azure OpenAI** for itinerary generation, subject to model and regional availability.
7. Add a managed database only when the product needs persistence; compare Azure Database for PostgreSQL and Azure SQL first.

These are candidate services, not requirements. For a small portfolio app, avoid adding services that do not solve a real need.

## Run locally

### Backend

From the repository root, in PowerShell:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Configure your Azure OpenAI resource details in the backend's local environment (for example, endpoint, deployment name, API version, and key, as required by the client configuration). Do not commit API keys or other secrets. Start the API from the `backend` directory:

```powershell
uvicorn main:app --reload
```

The API is available at `http://127.0.0.1:8000`.

### Frontend

In a second terminal, from the repository root:

```powershell
cd frontend
npm install
npm run dev
```

The development frontend calls the local backend at `http://127.0.0.1:8000`.

## Design palette

| Role         | Colour          | Hex       | Purpose                        |
| ------------ | --------------- | --------- | ------------------------------ |
| Primary      | Deep ocean teal | `#126E72` | Trustworthy and travel-related |
| Primary dark | Midnight navy   | `#123047` | Text and navigation            |
| Accent       | Sunset coral    | `#E76F51` | Buttons and highlights         |
| Background   | Warm cloud      | `#FFF9F2` | Softer than plain white        |
