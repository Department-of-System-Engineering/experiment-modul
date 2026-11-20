import SessionTable from "./Sessions/SessionsTable";
import H1 from "./UI/Tags/H1";
import { useLanguage } from "../context/LanguageContext";

const Sessions = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[720px] bg-[#F4F5F7] font-['IBM_Plex_Sans',_system-ui,_sans-serif] text-[#1B1F24]">
      <main className="max-w-[1120px] mx-[auto] my-[0] px-[24px] py-[40px] flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[6px]">
          {H1(t("runs"))}
          <p className="m-0 text-[14px] text-[#5B6470]">
            {t("runsDescription")}
          </p>
        </div>
        <div className="bg-[#FFFFFF] border-[1px] border-[solid] border-[#D9DDE3] rounded-[12px] overflow-x-auto">
          <SessionTable />
        </div>
      </main>
    </div>
  );
};

export default Sessions;
