from fastapi import APIRouter, HTTPException
from uuid import UUID
from datetime import datetime, timezone
from database import get_db
from models.experiment import Experiment, ExperimentCreate
import json

router = APIRouter(prefix="/experiments", tags=["experiments"])

@router.get("/", response_model=list[Experiment])
async def get_experiments():
    """
    Returns all non-deleted experiments (templates) with their linked questionnaires.
    Deleted experiments (soft deleted) are excluded via WHERE deleted_at IS NULL.
    Questionnaires are aggregated into a JSON array using json_agg.
    Results are ordered by creation date, newest first.
    """
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT e.*, json_agg(json_build_object('experiment_id', q.experiment_id, 'questionnaire_id', q.questionnaire_id, 'version', q.version, 'occasion', q.occasion, 'position', q.position)) FILTER (WHERE q.questionnaire_id IS NOT NULL) as questionnaires FROM experiments e LEFT JOIN experiment_questionnaires q ON e.id = q.experiment_id WHERE e.deleted_at IS NULL GROUP BY e.id ORDER BY e.created_at DESC")
        rows = cursor.fetchall()
        result = []
        for row in rows:
            experiment = dict(row)
            if experiment["questionnaires"] is None:
                experiment["questionnaires"] = []
            elif isinstance(experiment["questionnaires"], list):
                return None
            else:
                experiment["questionnaires"] = json.loads(str(experiment["questionnaires"]))
            result.append(experiment)
        return result

@router.get("/{id}", response_model=Experiment, responses={404: {"description": "Experiment not found"}})
async def get_experiment_by_id(id: UUID):
    """
    Returns a single non-deleted experiment by its UUID, with linked questionnaires.
    Raises 404 if the experiment does not exist or has been soft deleted.
    """
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT e.*, json_agg(json_build_object('experiment_id', q.experiment_id, 'questionnaire_id', q.questionnaire_id, 'version', q.version, 'occasion', q.occasion, 'position', q.position)) FILTER (WHERE q.questionnaire_id IS NOT NULL) as questionnaires FROM experiments e LEFT JOIN experiment_questionnaires q ON e.id = q.experiment_id WHERE e.id = %s AND e.deleted_at IS NULL GROUP BY e.id", (str(id),))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Experiment not found")
        experiment = dict(row)
        if experiment["questionnaires"] is None:
            experiment["questionnaires"] = []
        elif isinstance(experiment["questionnaires"], list):
            return None
        else:
            experiment["questionnaires"] = json.loads(str(experiment["questionnaires"]))
        return experiment

@router.post("/", response_model=Experiment, status_code=201)
async def create_experiment(experiment: ExperimentCreate):
    """
    Creates a new experiment (template) with its linked questionnaires.
    The experiment is saved first, then each questionnaire is inserted
    with the new experiment's ID and its current version.
    Once saved, the experiment cannot be modified — only soft deleted.

    Returns the created experiment with its linked questionnaires.
    """
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO experiments (name, ethics_approval_number, information_text) VALUES (%s, %s, %s) RETURNING *", (experiment.name, experiment.ethics_approval_number, experiment.information_text))
        row = dict(cursor.fetchone())
        experiment_id = row["id"]
        questionnaires = []
        for q in experiment.questionnaires:
            cursor.execute("INSERT INTO experiment_questionnaires (experiment_id, questionnaire_id, version, occasion, position) VALUES (%s, %s, %s, %s, %s) RETURNING *", (experiment_id, q.questionnaire_id, q.version, q.occasion.value, q.position))
            questionnaires.append(dict(cursor.fetchone()))
        row["questionnaires"] = questionnaires
        return row

@router.delete("/{experiment_id}", status_code=204, responses={404: {"description": "Experiment not found"}})
async def delete_experiment(experiment_id: UUID):
    """
    Soft deletes an experiment by setting its deleted_at timestamp.
    The experiment data and its completed runs are preserved in the database.
    Raises 404 if the experiment does not exist or is already deleted.
    """
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE experiments SET deleted_at = %s WHERE id = %s AND deleted_at IS NULL RETURNING *", (datetime.now(timezone.utc), str(experiment_id)))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Experiment not found or already deleted")