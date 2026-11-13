from pydantic import BaseModel, Field
from uuid import UUID, uuid4
from datetime import datetime, timezone
from typing import Optional
from enum import Enum

# Enums

class SessionLanguage(str, Enum):
    en = "en"
    hu = "hu"

class SessionStatus(str, Enum):
    in_progress = "in_progress"
    completed = "completed"

# Request columns

class SessionCreate(BaseModel):
    participant_pseudonym: str
    language: SessionLanguage

class SessionUpdateDemographics(BaseModel):
    demographics_id: str

class SessionResponseCreate(BaseModel):
    questionnaire_id: str
    response_id: str

# Response columns

class SessionResponse(BaseModel):
    session_id: UUID
    questionnaire_id: str
    response_id: str

class Session(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    experiment_id: UUID
    participant_pseudonym: str
    language: SessionLanguage
    paper_consent_confirmed_at: Optional[datetime] = None
    demographics_id: Optional[str] = None
    status: SessionStatus = Field(default=SessionStatus.in_progress)
    started_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    ended_at: Optional[datetime] = None
    responses: list[SessionResponse] = []
