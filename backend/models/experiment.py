from pydantic import BaseModel, Field
from uuid import UUID, uuid4
from datetime import datetime, timezone
from typing import Optional
from enum import Enum

# Enums

class ExperimentOccasion(str, Enum):
    pre = "pre"
    post = "post"
    between_cycles = "between_cycles"

# Request columns

class ExperimentCreate(BaseModel):
    name: str
    ethics_approval_number: str
    information_text: str
    questionnaires: list[ExperimentQuestionnaireCreate] = []

class ExperimentQuestionnaireCreate(BaseModel):
    questionnaire_id: str
    version: str
    occasion: ExperimentOccasion
    position: int

# Response columns

class ExperimentQuestionnaire(BaseModel):
    experiment_id: UUID
    questionnaire_id: str
    version: str
    occasion: ExperimentOccasion
    position: int

class Experiment(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    name: str
    ethics_approval_number: str
    information_text: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    deleted_at: Optional[datetime] = None
    questionnaires: list[ExperimentQuestionnaire] = []