import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const OptionsMenu = () => {
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState("HU");

  const linkClass = (path: string) =>
    location.pathname === path
      ? "text-[#2457C5] font-semibold no-underline"
      : "text-[#1B1F24] no-underline";

  return (
    <nav className="flex items-center gap-[24px] text-[15px] flex-wrap">
      {location.pathname === "/" ? (
        <Link to="/admin" className={linkClass("/admin")}>
          Admin
        </Link>
      ) : (
        <>
          <Link to="/admin" className={linkClass("/admin")}>
            Kísérletek
          </Link>
          <Link to="/admin/lefutott" className={linkClass("/admin/lefutott")}>
            Lefutott kísérletek
          </Link>
          <Link to="/" className={linkClass("/")}>
            Főoldal
          </Link>
        </>
      )}

      <fieldset
        role="group"
        aria-label="Nyelv"
        className="inline-flex border-[1px] border-solid border-[#C3C9D1] rounded-[8px] overflow-hidden"
      >
        <button
          type="button"
          aria-pressed={currentLanguage === "HU"}
          className={
            "min-w-[48px] min-h-[44px] border-0 font-size-[14px] " +
            (currentLanguage === "HU"
              ? "font-semibold bg-[#2457C5] text-[#FFFFFF]"
              : "font-medium bg-[#FFFFFF] text-[#1B1F24]")
          }
          onClick={() => setCurrentLanguage("HU")}
        >
          HU
        </button>
        <button
          type="button"
          aria-pressed={currentLanguage === "EN"}
          className={
            "min-w-[48px] min-h-[44px] border-0 font-size-[14px]  " +
            (currentLanguage === "EN"
              ? "font-semibold bg-[#2457C5] text-[#FFFFFF]"
              : "font-medium bg-[#FFFFFF] text-[#1B1F24]")
          }
          onClick={() => setCurrentLanguage("EN")}
        >
          EN
        </button>
      </fieldset>
    </nav>
  );
};

export default OptionsMenu;
