from pydantic import BaseModel, Field
from uuid import UUID, uuid4
from datetime import datetime, timezone
from typing import Optional
from enum import Enum

# Enums
class SessionLanguage(str, Enum):
    """
    Supported languages for participant-facing screens.
    - hu: Hungarian
    - en: English
    """
    en = "en"
    hu = "hu"

class SessionStatus(str, Enum):
    """
    Lifecycle status of a session (experiment run).
    - in_progress: the session has been started but not yet completed
    - completed: the participant has finished all steps
    """
    in_progress = "in_progress"
    completed = "completed"


# --- Request models (sent by the frontend) ---
class SessionCreate(BaseModel):
    """
    Request model for starting a new session.
    The experiment_id is passed as a query parameter, not in the body.
    """
    participant_pseudonym: str
    language: SessionLanguage

class SessionUpdateDemographics(BaseModel):
    """
    Request model for saving the demographics_id received from the Participant module
    after the participant completes the demographic form.
    """
    demographics_id: str

class SessionResponseCreate(BaseModel):
    """
    Request model for recording a completed questionnaire response.
    The response_id is received from the Questionnaire module.
    """
    questionnaire_id: str
    response_id: str


# --- Response models (returned by the backend) ---
class SessionResponse(BaseModel):
    """
    Represents a single completed questionnaire response linked to a session.
    """
    session_id: UUID
    questionnaire_id: str
    response_id: str

class Session(BaseModel):
    """
    Full session (experiment run) response model.
    Returned when listing or retrieving sessions.
    - paper_consent_confirmed_at is None until the participant confirms consent
    - demographics_id is None until the demographic form is completed
    - ended_at is None while the session is still in progress
    - responses contains all completed questionnaire responses
    """
    id: UUID = Field(default_factory=uuid4)
    experiment_id: UUID
    experiment_name: Optional[str] = None
    participant_pseudonym: str
    language: SessionLanguage
    paper_consent_confirmed_at: Optional[datetime] = None
    demographics_id: Optional[str] = None
    status: SessionStatus = Field(default=SessionStatus.in_progress)
    started_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    ended_at: Optional[datetime] = None
    responses: list[SessionResponse] = []
