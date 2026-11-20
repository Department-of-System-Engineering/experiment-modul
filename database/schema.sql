-- Experiment modul – schema.sql

-- 1. Sablon tábla
CREATE TABLE experiments (
    id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name                   VARCHAR(255) NOT NULL,
    ethics_approval_number VARCHAR(100) NOT NULL,
    information_text       TEXT,
    created_at             TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at             TIMESTAMP DEFAULT NULL
);

-- 2. Sablon kérdőívei
CREATE TABLE experiment_questionnaires (
    experiment_id    UUID NOT NULL REFERENCES experiments(id),
    questionnaire_id VARCHAR(100) NOT NULL,
    version          VARCHAR(50) NOT NULL,
    occasion         VARCHAR(20) NOT NULL CHECK (occasion IN ('pre', 'post', 'between_cycles')),
    position         INTEGER NOT NULL,
    PRIMARY KEY (experiment_id, questionnaire_id)
);

-- 3. Példány tábla
CREATE TABLE sessions (
    id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_id               UUID NOT NULL REFERENCES experiments(id),
    participant_pseudonym        VARCHAR(255) NOT NULL UNIQUE,
    language                    VARCHAR(5) NOT NULL CHECK (language IN ('hu', 'en')),
    paper_consent_confirmed_at  TIMESTAMP DEFAULT NULL,
    demographics_id             VARCHAR(100) DEFAULT NULL,
    status                      VARCHAR(20) NOT NULL DEFAULT 'in_progress'
                                    CHECK (status IN ('in_progress', 'completed')),
    started_at                  TIMESTAMP NOT NULL DEFAULT NOW(),
    ended_at                    TIMESTAMP DEFAULT NULL
);

-- 4. Példány válaszai
CREATE TABLE session_responses (
    session_id       UUID NOT NULL REFERENCES sessions(id),
    questionnaire_id VARCHAR(100) NOT NULL,
    response_id      VARCHAR(100) NOT NULL,
    PRIMARY KEY (session_id, questionnaire_id)
);