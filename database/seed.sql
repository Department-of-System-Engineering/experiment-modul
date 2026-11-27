-- Experiment modul – seed.sql
-- Test data for development purposes only.
-- Loaded automatically by Docker on first startup via docker-entrypoint-initdb.d.
-- DO NOT use in production.

-- 1. Test experiments (templates)
-- Includes one soft-deleted experiment to test filtering
INSERT INTO experiments (id, name, ethics_approval_number, information_text, created_at) VALUES
(
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Stresszhatás vizsgálata',
    'ETH-2026-001',
    'Ez a kíserlet a stresszhatás kognitív teljesítményre gyakorolt hatását vizsgálja.',
    NOW()
),
(
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'Memória és alvás kapcsolata',
    'ETH-2026-002',
    'Ez a kíserlet az alvásminőség és a memóriateljesítmény összefüggéseit vizsgálja.',
    NOW()
),
(
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    'Törölt kísérlet (teszt)',
    'ETH-2026-003',
    'Ez a kísérlet törölve lett.',
    NOW() - INTERVAL '10 days'
);

-- Soft delete the third experiment to test filtering on the main page
UPDATE experiments SET deleted_at = NOW() WHERE id = 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33';

-- 2. Link questionnaires to experiments
-- First experiment: pre and post questionnaires
-- Second experiment: pre, between_cycles and post questionnaires
INSERT INTO experiment_questionnaires (experiment_id, questionnaire_id, version, occasion, position) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'questionnaire-001', '1.0', 'pre', 1),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'questionnaire-002', '2.1', 'post', 2),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'questionnaire-001', '1.0', 'pre', 1),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'questionnaire-003', '1.2', 'between_cycles', 2),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'questionnaire-002', '2.1', 'post', 3);

-- 3. Test sessions (experiment runs)
-- One completed session and one in_progress session
INSERT INTO sessions (id, experiment_id, participant_pseudonym, language, paper_consent_confirmed_at, demographics_id, status, started_at, ended_at) VALUES
(
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'alma-korte-szilva',
    'hu',
    NOW() - INTERVAL '2 hours',
    'demo-001',
    'completed',
    NOW() - INTERVAL '2 hours',
    NOW() - INTERVAL '1 hour'
),
(
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a55',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'river-mountain-cloud',
    'en',
    NOW() - INTERVAL '30 minutes',
    NULL,
    'in_progress',
    NOW() - INTERVAL '30 minutes',
    NULL
);

-- 4. Test questionnaire responses for the completed session
INSERT INTO session_responses (session_id, questionnaire_id, response_id) VALUES
('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'questionnaire-001', 'response-001'),
('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'questionnaire-002', 'response-002');