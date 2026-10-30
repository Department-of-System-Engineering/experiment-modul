type Experiment = {
  id: number;
  name: string;
  ethicsApprovalNumber: number;
  information_text: string;
  created_at: Date;
  deleted_at?: Date | null;
};

type Experiment_questionnaire = {
  id: number;
  questionnaireId: string;
  version: string;
  position: number;
  occasion: null; // This field does not have a type defined in the provided context, so it is set to null for now.
};

type Session = {
  id: number;
  experimentId: number;
  participantPseudonym: string;
  language: "hu" | "en";
  paperConsentConfirmedAt: Date;
  demographicsId: string;
  status: "in progress" | "completed";
};

type SessionResponse = {
  id: number;
  responseId: string;
  questionnaireId: string;
};
