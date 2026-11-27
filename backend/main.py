from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from database import init_db, close_db
from routers import experiments, sessions

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Manages the application lifecycle.
    - Startup: initializes the database connection (init_db)
    - Shutdown: closes the database connection (close_db)
    Both are no-ops with psycopg2, but kept for consistency
    and future extensibility (e.g. switching to an async ORM).
    """
    await init_db()
    try:
        yield
    finally:
        await close_db()

app = FastAPI(title="Experiment modul API", lifespan=lifespan)

# Allow requests from the frontend dev server and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(experiments.router)
app.include_router(sessions.router)

@app.get("/health")
async def health():
    """
    Health check endpoint.
    Returns a simple status message to confirm the API is running.
    Used by monitoring tools and Docker healthchecks.
    """
    return {"status": "ok"}