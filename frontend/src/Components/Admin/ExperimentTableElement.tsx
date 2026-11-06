import "../../context/types";

const ExperimentTableElement = () => {
  return (
    <tr>
      <td className="p-[16px_20px] text-[#3D4550] border-t-[1px_solid_#E3E6EA] text-[#1B1F24] font-medium">
        WI pilot
      </td>
      <td className="p-[16px_20px] text-[#3D4550] border-t-[1px_solid_#E3E6EA]">
        [engedélyszám]
      </td>
      <td className="p-[16px_20px] text-[#3D4550] border-t-[1px_solid_#E3E6EA]">
        1. Pre-task questionnaire
        <br />
        2. Post-task questionnaire
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
