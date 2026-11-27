import Label from "../../UI/Tags/Label";
import TextInput from "../../UI/Inputs/TextInput";
import { useLanguage } from "../../../context/LanguageContext";

const ExperimentForm = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-[#FFFFFF] border-[1px] border-[solid] border-[#D9DDE3] rounded-[12px] p-[24px] flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[8px]">
        {Label("name", t("experimentName"))}
        {TextInput(
          true,
          "name",
          "text",
          undefined,
          undefined,
          t("experimentNamePlaceholder"),
        )}
      </div>
      <div className="flex flex-col gap-[8px]">
        {Label("ethics", t("ethicsNumber"))}
        {TextInput(
          true,
          "ethics",
          "text",
          undefined,
          true,
          t("ethicsPlaceholder"),
        )}
        <div className="text-[13px] text-[#5B6470]">{t("required")}</div>
      </div>
      <div className="flex flex-col gap-[8px]">
        {Label("info", t("information"))}
        {TextInput(
          false,
          "info",
          undefined,
          5,
          undefined,
          t("informationPlaceholder"),
        )}
      </div>
    </section>
  );
};

export default ExperimentForm;
