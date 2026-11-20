import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";

const OptionsMenu = () => {
  const location = useLocation();
  const { language, setLanguage } = useLanguage();

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
          <Link to="/admin/runs" className={linkClass("/admin/lefutott")}>
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
          aria-pressed={language === "hu"}
          className={
            "min-w-[48px] min-h-[44px] border-0 font-size-[14px] " +
            (language === "hu"
              ? "font-semibold bg-[#2457C5] text-[#FFFFFF]"
              : "font-medium bg-[#FFFFFF] text-[#1B1F24]")
          }
          onClick={() => setLanguage("hu")}
        >
          HU
        </button>
        <button
          type="button"
          aria-pressed={language === "en"}
          className={
            "min-w-[48px] min-h-[44px] border-0 font-size-[14px]  " +
            (language === "en"
              ? "font-semibold bg-[#2457C5] text-[#FFFFFF]"
              : "font-medium bg-[#FFFFFF] text-[#1B1F24]")
          }
          onClick={() => setLanguage("en")}
        >
          EN
        </button>
      </fieldset>
    </nav>
  );
};

export default OptionsMenu;
