import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from main import app

@pytest.fixture
def mock_db():
    """
    Mocks the database connection so tests don't need a real PostgreSQL instance.
    Patches get_db in both experiments and sessions routers.
    """
    with patch("routers.experiments.get_db") as mock_exp, \
         patch("routers.sessions.get_db") as mock_ses:
        conn = MagicMock()
        cursor = MagicMock()
        conn.cursor.return_value = cursor
        for mock in [mock_exp, mock_ses]:
            mock.return_value.__enter__ = MagicMock(return_value=conn)
            mock.return_value.__exit__ = MagicMock(return_value=False)
        yield cursor

@pytest.fixture
def client():
    with TestClient(app) as client:
        yield client