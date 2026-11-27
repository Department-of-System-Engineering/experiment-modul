import api from "./call-api";
import type { Experiment, Session } from "./types";

// Experiments
export const getExperiments = async (): Promise<Experiment[]> => {
  const res = await api.get("/experiments/");
  return res.data;
};

export const getExperiment = async (id: string): Promise<Experiment> => {
  const res = await api.get(`/experiments/${id}`);
  return res.data;
};

export const createExperiment = async (
  data: Omit<Experiment, "id" | "created_at" | "deleted_at">,
): Promise<Experiment> => {
  const res = await api.post("/experiments/", data);
  return res.data;
};

export const deleteExperiment = async (id: string): Promise<void> => {
  await api.delete(`/experiments/${id}`);
};

// Sessions
export const getSessions = async (): Promise<Session[]> => {
  const res = await api.get("/sessions/");
  return res.data;
};

export const createSession = async (
  experiment_id: string,
  data: { participant_pseudonym: string; language: "hu" | "en" },
): Promise<Session> => {
  const res = await api.post(`/sessions/?experiment_id=${experiment_id}`, data);
  return res.data;
};

export const confirmConsent = async (session_id: string): Promise<Session> => {
  const res = await api.post(`/sessions/${session_id}/consent`);
  return res.data;
};

export const updateDemographics = async (
  session_id: string,
  demographics_id: string,
): Promise<Session> => {
  const res = await api.post(`/sessions/${session_id}/demographics`, {
    demographics_id,
  });
  return res.data;
};

export const addResponse = async (
  session_id: string,
  data: { questionnaire_id: string; response_id: string },
): Promise<Session> => {
  const res = await api.post(`/sessions/${session_id}/responses`, data);
  return res.data;
};
