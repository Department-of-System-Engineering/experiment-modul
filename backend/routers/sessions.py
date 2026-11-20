from fastapi import APIRouter, HTTPException
from uuid import UUID
from datetime import datetime, timezone
from database import get_db
from models.session import Session, SessionCreate, SessionUpdateDemographics, SessionResponseCreate
import json

router = APIRouter(prefix="/sessions", tags=["sessions"])

@router.get("/", response_model=list[Session])
async def get_sessions():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT s.*, e.name as experiment_name, json_agg(json_build_object('session_id', r.session_id, 'questionnaire_id', r.questionnaire_id, 'response_id', r.response_id)) FILTER (WHERE r.session_id IS NOT NULL) as responses FROM sessions s JOIN experiments e ON s.experiment_id = e.id LEFT JOIN session_responses r ON s.id = r.session_id GROUP BY s.id, e.name ORDER BY s.started_at DESC")        
        rows = cursor.fetchall()
        result = []
        for row in rows:
            session = dict(row)
            if session["responses"] is None:
                session["responses"] = []
            elif isinstance(session["responses"], list):
                pass
            else:
                session["responses"] = json.loads(str(session["responses"]))
            result.append(session)
        return result

@router.post("/", response_model=Session, status_code=201)
async def create_session(experiment_id: UUID, data: SessionCreate):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM experiments WHERE id = %s AND deleted_at IS NULL", (str(experiment_id),))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Experiment not found")
        cursor.execute("INSERT INTO sessions (experiment_id, participant_pseudonym, language) VALUES (%s, %s, %s) RETURNING *", (str(experiment_id), data.participant_pseudonym, data.language.value))
        row = dict(cursor.fetchone())
        row["responses"] = []
        return row

@router.post("/{session_id}/consent", response_model=Session)
async def confirm_consent(session_id: UUID):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE sessions SET paper_consent_confirmed_at = %s WHERE id = %s AND paper_consent_confirmed_at IS NULL RETURNING *", (datetime.now(timezone.utc), str(session_id)))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Session not found or consent already confirmed")
        result = dict(row)
        result["responses"] = []
        return result

@router.post("/{session_id}/demographics", response_model=Session)
async def update_demographics(session_id: UUID, data: SessionUpdateDemographics):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE sessions SET demographics_id = %s WHERE id = %s RETURNING *", (data.demographics_id, str(session_id)))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Session not found")
        result = dict(row)
        result["responses"] = []
        return result

@router.post("/{session_id}/responses", response_model=Session)
async def add_response(session_id: UUID, data: SessionResponseCreate):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM sessions WHERE id = %s AND status = 'in_progress'", (str(session_id),))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Session not found or already completed")
        cursor.execute("INSERT INTO session_responses (session_id, questionnaire_id, response_id) VALUES (%s, %s, %s)", (str(session_id), data.questionnaire_id, data.response_id))
        cursor.execute("SELECT s.*, json_agg(json_build_object('session_id', r.session_id, 'questionnaire_id', r.questionnaire_id, 'response_id', r.response_id)) FILTER (WHERE r.session_id IS NOT NULL) as responses FROM sessions s LEFT JOIN session_responses r ON s.id = r.session_id WHERE s.id = %s GROUP BY s.id", (str(session_id),))
        result = dict(cursor.fetchone())
        result["responses"] = json.loads(str(result["responses"]))
        return result

@router.patch("/{session_id}/complete", response_model=Session)
async def complete_session(session_id: UUID):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE sessions SET status = 'completed', ended_at = %s WHERE id = %s AND status = 'in_progress' RETURNING *", (datetime.now(timezone.utc), str(session_id)))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Session not found or already completed")
        result = dict(row)
        result["responses"] = []
        return result