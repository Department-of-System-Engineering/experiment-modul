from fastapi import FastAPI
from contextlib import asynccontextmanager
from database import init_db, close_db
from routers import experiments, sessions

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    await close_db()

app = FastAPI(title="Experiment modul API", lifespan=lifespan)

app.include_router(experiments.router)
app.include_router(sessions.router)

@app.get("/health")
async def health():
    return {"status": "ok"}