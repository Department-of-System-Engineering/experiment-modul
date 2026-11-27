// import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import H1 from "../../UI/Tags/H1";
import StartExperimentForm from "../StartExperiment/StartExperimentForm";

const StartExperiment = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[720px] bg-[#F4F5F7] font-['IBM_Plex_Sans',_system-ui,_sans-serif] text-[#1B1F24]">
      <main className="max-w-screen-sm mx-[auto] my-[0] px-[24px] py-[40px] flex flex-col gap-[24px]">
        <Link
          to="/"
          className="text-[14px] no-underline text-[blue] hover:text-[darkblue]"
        >
          ← {t("experiments")}
        </Link>
        {H1(t("startExperiment"))}
        <StartExperimentForm />
      </main>
    </div>
  );
};

export default StartExperiment;
