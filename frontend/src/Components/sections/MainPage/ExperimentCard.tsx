import { Link } from "react-router-dom";
import type { Experiment } from "../../../context/types";
import { useLanguage } from "../../../context/LanguageContext";

interface Props {
  experiment: Experiment;
}

const ExperimentCard = ({ experiment }: Props) => {
  const { t } = useLanguage();

  return (
    <li className="flex items-center justify-between gap-[16px] flex-wrap bg-[#FFFFFF] border-[1px] border-[solid] border-[#D9DDE3] rounded-[12px] px-[24px] py-[20px]">
      <div className="flex flex-col gap-[4px]">
        <div className="text-[18px] font-semibold">{experiment.name}</div>
        <div className="text-[14px] text-[#5B6470]">
          {t("ethicsNumber")}: {experiment.ethics_approval_number} ·{" "}
          {experiment.questionnaires.length} {t("questionnaires")}
        </div>
      </div>
      <Link
        to={`/start/${experiment.id}`}
        className="inline-flex items-center justify-center min-h-[44px] px-[20px] py-[0] rounded-[8px] bg-[#2457C5] text-[#FFFFFF] text-[15px] font-medium no-underline"
      >
        {t("launch")}
      </Link>
    </li>
  );
};

export default ExperimentCard;
