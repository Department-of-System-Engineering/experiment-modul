import { Link } from "react-router-dom";
import H1 from "./UI/Tags/H1";
import ExperimentForm from "./Experiment/ExperimentForm";

const Experiment = () => {
  return (
    <div className="min-h-[1160px] bg-[#F4F5F7] font-['IBM_Plex_Sans',_system-ui,_sans-serif] text-[#1B1F24]">
      <main className="max-w-[880px] mx-[auto] my-[0] px-[24px] py-[40px] flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[6px]">
          <Link to="/admin" className="text-[14px] no-underline">
            ← Kísérletek
          </Link>
          {H1("Új kísérlet")}
          <ExperimentForm />
          {/* Kérdőívek sorrendje és lekérése ide */}
        </div>
      </main>
    </div>
  );
};

export default Experiment;
