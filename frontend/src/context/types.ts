export type ExperimentQuestionnaire = {
  experiment_id: string;
  questionnaire_id: string;
  version: string;
  occasion: "pre" | "post" | "between_cycles";
  position: number;
};

export type Experiment = {
  id: string;
  name: string;
  ethics_approval_number: string;
  information_text: string | null;
  created_at: string;
  deleted_at: string | null;
  questionnaires: ExperimentQuestionnaire[];
};

export type SessionResponse = {
  session_id: string;
  questionnaire_id: string;
  response_id: string;
};

export type Session = {
  id: string;
  experiment_id: string;
  experiment_name: string;
  participant_pseudonym: string;
  language: "hu" | "en";
  paper_consent_confirmed_at: string | null;
  demographics_id: string | null;
  status: "in_progress" | "completed";
  started_at: string;
  ended_at: string | null;
  responses: SessionResponse[];
};
