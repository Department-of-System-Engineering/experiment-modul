import { useState } from "react";

const TextInput = (
  regularInput: boolean,
  id: string,
  type: string | undefined,
  row: number | undefined,
  required: boolean | undefined,
  placeholder: string,
) => {
  const [data, setData] = useState<string>("");

  return regularInput ? (
    <input
      id={id}
      type={type}
      value={data}
      required={required}
      placeholder={placeholder}
      onChange={(e) => setData(e.target.value)}
      className="min-h-[44px] px-[12px] py-[0] border-[1px] border-[solid] border-[#C3C9D1] rounded-[8px] [font:inherit] text-[15px] text-[#1B1F24]"
    />
  ) : (
    <textarea
      id={id}
      rows={row}
      value={data}
      required={required}
      placeholder={placeholder}
      onChange={(e) => setData(e.target.value)}
      className="px-[12px] py-[10px] border-[1px] border-[solid] border-[#C3C9D1] rounded-[8px] [font:inherit] text-[15px] text-[#5B6470] resize-y"
    />
  );
};

export default TextInput;
