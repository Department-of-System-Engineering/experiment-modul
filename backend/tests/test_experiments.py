# Tests for the experiments router.
# The database is mocked so no real PostgreSQL connection is needed.
# Each test uses the mock_db fixture from conftest.py.

def test_get_experiments(client, mock_db):
    mock_db.fetchall.return_value = []
    response = client.get("/experiments/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_experiment(client, mock_db):
    mock_db.fetchone.return_value = {
        "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        "name": "Test experiment",
        "ethics_approval_number": "ETH-TEST-001",
        "information_text": "Test",
        "created_at": "2026-11-20T08:00:00",
        "deleted_at": None,
    }
    response = client.post("/experiments/", json={
        "name": "Test experiment",
        "ethics_approval_number": "ETH-TEST-001",
        "information_text": "Test",
        "questionnaires": []
    })
    assert response.status_code == 201
    assert response.json()["name"] == "Test experiment"

def test_delete_experiment(client, mock_db):
    mock_db.fetchone.return_value = {
        "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"
    }
    response = client.delete("/experiments/a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11")
    assert response.status_code == 204

def test_delete_nonexistent_experiment(client, mock_db):
    mock_db.fetchone.return_value = None
    response = client.delete("/experiments/00000000-0000-0000-0000-000000000000")
    assert response.status_code == 404

def test_health(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}