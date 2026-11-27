from pydantic import BaseModel, Field
from uuid import UUID, uuid4
from datetime import datetime, timezone
from typing import Optional
from enum import Enum

# Enums
class ExperimentOccasion(str, Enum):
    """
    Defines when a questionnaire is administered during an experiment.
    - pre: before the main task
    - post: after the main task
    - between_cycles: between repeated cycles of the task
    """
    pre = "pre"
    post = "post"
    between_cycles = "between_cycles"


# --- Request models (sent by the frontend) ---
class ExperimentQuestionnaireCreate(BaseModel):
    """
    Represents a questionnaire to be linked to an experiment.
    Used in the request body when creating a new experiment.
    The experiment_id is not included here — it is filled in by the backend
    from the parent experiment.
    """
    questionnaire_id: str
    version: str
    occasion: ExperimentOccasion
    position: int

class ExperimentCreate(BaseModel):
    """
    Request model for creating a new experiment (template).
    Once saved, an experiment cannot be modified — only soft deleted.
    """
    name: str
    ethics_approval_number: str
    information_text: Optional[str] = None
    questionnaires: list[ExperimentQuestionnaireCreate] = []


# --- Response models (returned by the backend) ---

class ExperimentQuestionnaire(BaseModel):
    """
    Represents a questionnaire linked to an experiment, as stored in the database.
    Includes the experiment_id foreign key, which is read back from the database.
    """
    experiment_id: UUID
    questionnaire_id: str
    version: str
    occasion: ExperimentOccasion
    position: int

class Experiment(BaseModel):
    """
    Full experiment (template) response model.
    Returned when listing or retrieving experiments.
    - deleted_at is None if the experiment has not been soft deleted
    - questionnaires contains all linked questionnaires in order
    """
    id: UUID = Field(default_factory=uuid4)
    name: str
    ethics_approval_number: str
    information_text: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    deleted_at: Optional[datetime] = None
    questionnaires: list[ExperimentQuestionnaire] = []