import { Link } from "react-router-dom";
import ExperimentTable from "../sections/Admin/ExperimentTable";
import H1 from "../UI/Tags/H1";
import { useLanguage } from "../../context/LanguageContext";

const Admin = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[720px] bg-[#F4F5F7] font-['IBM_Plex_Sans',_system-ui,_sans-serif] text-[#1B1F24]">
      <main className="max-w-[1120px] mx-[auto] my-[0] px-[24px] py-[40px] flex flex-col gap-[20px]">
        <div className="flex items-center justify-between gap-[16px] flex-wrap">
          {H1(t("experiments"))}
          <Link
            to="/admin/new"
            className="inline-flex items-center justify-center min-h-[44px] px-[20px] py-[0] rounded-[8px] bg-[#2457C5] text-[#FFFFFF] text-[15px] font-medium no-underline gap-[8px]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M8 3v10M3 8h10"></path>
            </svg>
            {t("newExperiment")}
          </Link>
        </div>
        <div className="bg-[#FFFFFF] border-[1px] border-[#D9DDE3] rounded-[12px] overflow-x-auto">
          <ExperimentTable />
        </div>
        <p className="m-0 text-[14px] text-[#5B6470]">{t("deleteWarning")}</p>
      </main>
    </div>
  );
};

export default Admin;
