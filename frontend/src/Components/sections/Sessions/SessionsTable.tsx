import { useState, useEffect } from "react";
import type { Session } from "../../../context/types";
import { getSessions } from "../../../context/service";
import SessionTableElement from "./SessionTableElement";
import { useLanguage } from "../../../context/LanguageContext";

const SessionTable = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    getSessions()
      .then((response) => setSessions(response))
      .catch((err) => console.log(`Error: ${err.message}`));
  }, []);

  return (
    <table className="w-full border-collapse text-[15px] min-w-[820px]">
      <thead>
        <tr className="text-left text-[#5b6470] text-[13px]">
          <th className="px-[20px] py-[14px] font-medium border-b-[1px_solid_#d9dde3]">
            {t("experiment")}
          </th>
          <th className="px-[20px] py-[14px] font-medium border-b-[1px_solid_#d9dde3]">
            {t("participant")}
          </th>
          <th className="px-[20px] py-[14px] font-medium border-b-[1px_solid_#d9dde3]">
            {t("language")}
          </th>
          <th className="px-[20px] py-[14px] font-medium border-b-[1px_solid_#d9dde3]">
            {t("start")}
          </th>
          <th className="px-[20px] py-[14px] font-medium border-b-[1px_solid_#d9dde3]">
            {t("end")}
          </th>
          <th className="px-[20px] py-[14px] font-medium border-b-[1px_solid_#d9dde3]">
            {t("status")}
          </th>
        </tr>
      </thead>
      <tbody>
        {sessions.map((session) => (
          <SessionTableElement key={session.id} session={session} />
        ))}
      </tbody>
    </table>
  );
};

export default SessionTable;
