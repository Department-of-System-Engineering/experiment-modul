import psycopg2
import psycopg2.extras
from contextlib import contextmanager
from typing import Optional

DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/experiment_modul?options=-c%20client_encoding%3DUTF8"

async def init_db():
    return None

async def close_db():
    return None

@contextmanager
def get_db():
    conn = psycopg2.connect(
        DATABASE_URL,
        cursor_factory=psycopg2.extras.RealDictCursor
    )
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()
