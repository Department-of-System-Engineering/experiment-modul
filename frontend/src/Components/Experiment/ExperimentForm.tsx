import Label from "../UI/Tags/Label";
import TextInput from "../UI/Inputs/TextInput";

const ExperimentForm = () => {
  return (
    <section className="bg-[#FFFFFF] border-[1px] border-[solid] border-[#D9DDE3] rounded-[12px] p-[24px] flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[8px]">
        {Label("name", "Név")}
        {TextInput(
          true,
          "name",
          "text",
          undefined,
          undefined,
          "Adja meg a kísérlet nevét!",
        )}
      </div>
      <div className="flex flex-col gap-[8px]">
        {Label("ethics", "Etikai Engedély száma")}
        {TextInput(
          true,
          "ethics",
          "text",
          undefined,
          true,
          "Adja meg az etikai engedélyszámot!",
        )}
        <div className="text-[13px] text-[#5B6470]">Kötelező.</div>
      </div>
      <div className="flex flex-col gap-[8px]">
        {Label("info", "Tájékoztató")}
        {TextInput(false, "info", undefined, 5, undefined, "Információ . . .")}
      </div>
    </section>
  );
};

export default ExperimentForm;
