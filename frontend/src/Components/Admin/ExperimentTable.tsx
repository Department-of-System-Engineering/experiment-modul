import { useState, useEffect } from "react";
import { getExperiments } from "../../context/service";
import ExperimentTableElement from "./ExperimentTableElement";
import type { Experiment } from "../../context/types";

const ExperimentTable = () => {
  const [data, setData] = useState<Experiment[]>([]);

  useEffect(() => {
    getExperiments()
      .then((response) => setData(response))
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  return (
    <table className="w-[100%] border-collapse text-[15px] min-w-[820px]">
      <thead>
        <tr className="text-left text-[#5B6470] text-[13px]">
          <th className="p-[14px_20px] font-medium border-b-[1px_solid_#D9DDE3]">
            Név
          </th>
          <th className="p-[14px_20px] font-medium border-b-[1px_solid_#D9DDE3]">
            Etikai engedély
          </th>
          <th className="p-[14px_20px] font-medium border-b-[1px_solid_#D9DDE3]">
            Kérdőívek
          </th>
          <th className="p-[14px_20px] font-medium border-b-[1px_solid_#D9DDE3]">
            Létrehozva
          </th>
          <th className="p-[14px_20px] font-medium border-b-[1px_solid_#D9DDE3] text-right">
            Műveletek
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((experiment) => (
          <ExperimentTableElement
            key={experiment.id}
            experiment={experiment}
            onDelete={(id) =>
              setData((prev) => prev.filter((e) => e.id !== id))
            }
          />
        ))}
      </tbody>
    </table>
  );
};

export default ExperimentTable;
