import type { Session } from "../../context/types";
import { useLanguage } from "../../context/LanguageContext";

interface Props {
  session: Session;
}

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hour = String(d.getHours()).padStart(2, "0");
  const minute = String(d.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}`;
};

const SessionTableElement = ({ session }: Props) => {
  const { t } = useLanguage();

  return (
    <tr>
      <td className="px-[20px] py-[16px] text-[#3D4550] border-t-[1px_solid_#E3E6EA] text-[#1B1F24] font-medium">
        {session.experiment_name}
      </td>
      <td className="px-[20px] py-[16px] text-[#3D4550] border-t-[1px_solid_#E3E6EA] text-[#1B1F24] font-medium">
        {session.participant_pseudonym}
      </td>
      <td className="px-[20px] py-[16px] text-[#3D4550] border-t-[1px_solid_#E3E6EA] text-[#1B1F24] font-medium">
        {session.language}
      </td>
      <td className="px-[20px] py-[16px] text-[#3D4550] border-t-[1px_solid_#E3E6EA] text-[#1B1F24] font-medium">
        {formatDate(session.started_at)}
      </td>
      <td className="px-[20px] py-[16px] text-[#3D4550] border-t-[1px_solid_#E3E6EA] text-[#1B1F24] font-medium">
        {session.ended_at ? formatDate(session.ended_at) : "—"}
      </td>
      <td className="px-5 py-4 text-[#3D4550] border-t border-[#E3E6EA]">
        <span
          className={`inline-block px-[10px] py-[2px] rounded-full text-[13px] font-medium ${
            session.status === "completed"
              ? "bg-[#e3f4ea] text-[#1d6b3a]"
              : "bg-[#e6edfb] text-[#1f4ba8]"
          }`}
        >
          {session.status === "completed" ? t("completed") : t("inProgress")}
        </span>
      </td>
    </tr>
  );
};

export default SessionTableElement;
