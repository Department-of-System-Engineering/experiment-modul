import { useEffect, useState } from "react";
import { getExperiments } from "../../context/service";
import type { Experiment } from "../../context/types";
import H1 from "../UI/Tags/H1";
import ExperimentCard from "../sections/MainPage/ExperimentCard";
import { useLanguage } from "../../context/LanguageContext";

const MainPage = () => {
  const [data, setData] = useState<Experiment[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    getExperiments()
      .then((response) => setData(response))
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  return (
    <div className="bg-[#F4F5F7] font-['IBM_Plex_Sans',_system-ui,_sans-serif] text-[#1B1F24]">
      <main className="max-w-[880px] mx-[auto] my-[0] px-[24px] py-[40px] flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[6px]">
          {H1(t("startExperiment"))}
          <p className="m-0 text-[15px] text-[#5B6470]">
            {t("startExperimentDescription")}
          </p>
        </div>
        <ul className="m-0 p-0 [list-style:none] flex flex-col gap-[12px]">
          {data?.map((experiment) => (
            <ExperimentCard key={experiment.id} experiment={experiment} />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default MainPage;
