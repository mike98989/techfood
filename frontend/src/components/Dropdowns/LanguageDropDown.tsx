import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../methods/reducers/language";
import { useTranslation } from "react-i18next";
import worldAtlas from "../../images/logo/world_atlas.png";

const LanguageDropDown = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative flex">
      <button
        className="text-[#98A6AD] hover:text-body flex flex-row"
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img src={worldAtlas} className="w-6 mr-2" alt="World_atlas" />
        {t("language")}
        <svg
          className="mt-1 ml-1 w-5 h-5 text-[#98A6AD] dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </button>
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 top-full z-40 w-40 space-y-1 rounded-sm border border-stroke bg-white p-1.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <button
          className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
          onClick={() => {
            dispatch(setLanguage({ language: "en" }));
            setSelectedLanguage("en");
          }}
        >
          English
        </button>
        <button
          className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
          onClick={() => {
            dispatch(setLanguage({ language: "sv" }));
            setSelectedLanguage("sv");
          }}
        >
          Swedish
        </button>
        {/* <button
          className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
          onClick={() => {
            dispatch(setLanguage({ language: "ar" }));
            setSelectedLanguage("ar");
          }}
        >
          Arabic
        </button> */}
        <button
          className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
          onClick={() => {
            dispatch(setLanguage({ language: "fr" }));
            setSelectedLanguage("fr");
          }}
        >
          French
        </button>
        <button
          className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
          onClick={() => {
            dispatch(setLanguage({ language: "sp" }));
            setSelectedLanguage("sp");
          }}
        >
          Spanish
        </button>
        <button
          className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
          onClick={() => {
            dispatch(setLanguage({ language: "pt" }));
            setSelectedLanguage("pt");
          }}
        >
          Portuguese
        </button>
      </div>
    </div>
  );
};

export default LanguageDropDown;
