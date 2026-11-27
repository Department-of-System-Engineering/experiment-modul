# Tests for the sessions router.
# The database is mocked so no real PostgreSQL connection is needed.
# Each test uses the mock_db fixture from conftest.py.

def test_get_sessions(client, mock_db):
    mock_db.fetchall.return_value = []
    response = client.get("/sessions/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_session(client, mock_db):
    mock_db.fetchone.return_value = {
        "id": "d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44",
        "experiment_id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        "experiment_name": "Test experiment",
        "participant_pseudonym": "teszt-alma-korte",
        "language": "hu",
        "paper_consent_confirmed_at": None,
        "demographics_id": None,
        "status": "in_progress",
        "started_at": "2026-11-20T08:00:00",
        "ended_at": None,
    }
    response = client.post(
        "/sessions/?experiment_id=a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        json={"participant_pseudonym": "teszt-alma-korte", "language": "hu"}
    )
    assert response.status_code == 201

def test_confirm_consent(client, mock_db):
    mock_db.fetchone.return_value = {
        "id": "d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44",
        "experiment_id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        "experiment_name": "Test experiment",
        "participant_pseudonym": "teszt-alma-korte",
        "language": "hu",
        "paper_consent_confirmed_at": "2026-11-20T08:05:00",
        "demographics_id": None,
        "status": "in_progress",
        "started_at": "2026-11-20T08:00:00",
        "ended_at": None,
    }
    response = client.post("/sessions/d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44/consent")
    assert response.status_code == 200

def test_complete_session(client, mock_db):
    mock_db.fetchone.return_value = {
        "id": "d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44",
        "experiment_id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        "experiment_name": "Test experiment",
        "participant_pseudonym": "teszt-alma-korte",
        "language": "hu",
        "paper_consent_confirmed_at": "2026-11-20T08:05:00",
        "demographics_id": "demo-001",
        "status": "completed",
        "started_at": "2026-11-20T08:00:00",
        "ended_at": "2026-11-20T09:00:00",
    }
    response = client.patch("/sessions/d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44/complete")
    assert response.status_code == 200

def test_complete_nonexistent_session(client, mock_db):
    mock_db.fetchone.return_value = None
    response = client.patch("/sessions/00000000-0000-0000-0000-000000000000/complete")
    assert response.status_code == 404