import { Link } from "react-router-dom";
import type { Experiment } from "../../context/types";

interface Props {
  experiment: Experiment;
}

const ExperimentCard = ({ experiment }: Props) => {
  return (
    <li className="flex items-center justify-between gap-[16px] flex-wrap bg-[#FFFFFF] border-[1px] border-[solid] border-[#D9DDE3] rounded-[12px] px-[24px] py-[20px]">
      <div className="flex flex-col gap-[4px]">
        <div className="text-[18px] font-semibold">{experiment.name}</div>
        <div className="text-[14px] text-[#5B6470]">
          Etikai engedély: {experiment.ethics_approval_number} ·{" "}
          {experiment.questionnaires.length} kérdőív
        </div>
      </div>
      <Link
        to="/inditas"
        className="inline-flex items-center justify-center min-h-[44px] px-[20px] py-[0] rounded-[8px] bg-[#2457C5] text-[#FFFFFF] text-[15px] font-medium no-underline"
      >
        Indítás
      </Link>
    </li>
  );
};

export default ExperimentCard;
