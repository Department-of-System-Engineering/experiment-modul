import type { Experiment } from "../../context/types";

interface Props {
  experiment: Experiment;
}

const ExperimentTableElement = ({ experiment }: Props) => {
  return (
    <tr>
      <td className="p-[16px_20px] text-[#3D4550] border-t-[1px_solid_#E3E6EA] text-[#1B1F24] font-medium">
        {experiment.name}
      </td>
      <td className="p-[16px_20px] text-[#3D4550] border-t-[1px_solid_#E3E6EA]">
        {experiment.ethics_approval_number}
      </td>
      <td className="p-[16px_20px] text-[#3D4550] border-t-[1px_solid_#E3E6EA]">
        {experiment.questionnaires.map((questionnaire, index) => (
          <span key={questionnaire.questionnaire_id}>
            {index + 1}. {questionnaire.occasion}-task questionnaire
            <br />
          </span>
        ))}
      </td>
      <td className="p-[16px_20px] text-[#3D4550] border-t-[1px_solid_#E3E6EA]">
        2026-10-29
      </td>
      <td className="p-[16px_20px] text-[#3D4550] border-t-[1px_solid_#E3E6EA] text-right">
        <button
          type="button"
          className="inline-flex items-center justify-center min-h-[44px] px-[20px] py-[0] rounded-[8px] border-[1px] border-[solid] border-[#C3C9D1] bg-[#FFFFFF] text-[#1B1F24] text-[15px] font-medium no-underline [font:inherit] text-[14px] text-[#B42318] border-[#E8B4AE]"
        >
          Törlés
        </button>
      </td>
    </tr>
  );
};

export default ExperimentTableElement;
