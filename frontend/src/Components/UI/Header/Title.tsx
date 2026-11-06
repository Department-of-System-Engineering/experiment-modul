import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Title = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  }, [location.pathname]);

  return (
    <div className="flex items-center gap-[10px]">
      <div className="font-semibold text-[17px]">Experiment modul</div>
      <span
        className={
          "text-[12px] font-semibold tracking-[0.04em] text-[#FFFFFF] bg-[#3D4550] rounded-[4px] px-[8px] py-[2px] " +
          (isAdmin ? " visible" : " invisible")
        }
      >
        ADMIN
      </span>
    </div>
  );
};

export default Title;
