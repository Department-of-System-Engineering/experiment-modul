export const translations = {
  hu: {
    // Admin oldal
    experiments: "Kísérletek",
    newExperiment: "Új kísérlet",
    experimentName: "Név",
    ethicsNumber: "Etikai engedély száma",
    information: "Tájékoztató",
    created: "Létrehozva",
    actions: "Műveletek",
    delete: "Törlés",
    deleteWarning:
      "A mentett kísérlet nem módosítható. A törlés csak elrejti: a törölt kísérlet nem jelenik meg a főoldalon, de az adatai és a lefutott példányai megmaradnak.",
    // Lefutott kísérletek
    runs: "Lefutott kísérletek",
    runsDescription:
      "Minden elindított kísérlet, a legutóbbi elöl. A törölt kísérletek példányai is itt maradnak.",
    experiment: "Kísérlet",
    participant: "Résztvevő",
    language: "Nyelv",
    start: "Kezdés",
    end: "Befejezés",
    status: "Állapot",
    inProgress: "Folyamatban",
    completed: "Befejezve",
  },
  en: {
    // Admin
    experiments: "Experiments",
    newExperiment: "New experiment",
    experimentName: "Name",
    ethicsNumber: "Ethics approval number",
    information: "Information",
    created: "Created",
    actions: "Actions",
    delete: "Delete",
    deleteWarning:
      "A saved experiment cannot be modified. Deletion only hides it: the deleted experiment will not appear on the main page, but its data and completed runs remain.",
    // Runs
    runs: "Completed experiments",
    runsDescription:
      "All started experiments, most recent first. Deleted experiment runs remain here.",
    experiment: "Experiment",
    participant: "Participant",
    language: "Language",
    start: "Start",
    end: "End",
    status: "Status",
    inProgress: "In progress",
    completed: "Completed",
  },
};

export type TranslationKey = keyof typeof translations.hu;
