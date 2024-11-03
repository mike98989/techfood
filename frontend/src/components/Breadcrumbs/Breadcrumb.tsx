import { Link } from "react-router-dom";
import * as Constants from "../../Utils/Constants";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { ReusableMethods } from "../../methods/ReusableMethods";
const Breadcrumb = ({
  links,
  showNewButton,
  pageTitle,
}: {
  links: any;
  showNewButton: boolean;
  pageTitle: string;
}) => {
  const { t } = useTranslation();
  const { getUrlArray } = ReusableMethods();

  return (
    <div className="mb-6 px-0 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-sm font-thin text-black dark:text-white dark:text-whit ml-3 mt-0 mb-1">
        {pageTitle}
        {showNewButton && (
          <button
            type="button"
            className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 ml-3"
          >
            <svg
              className="w-[20px] h-[20px] text-gray-800 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                clipRule="evenodd"
              />
            </svg>{" "}
            <NavLink
              to={"/" + getUrlArray()[1] + "/new"}
              className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
            >
              <span className="mx-2 text-xs text-white">{t("add_new")}</span>
            </NavLink>
          </button>
        )}
      </h2>

      <nav
        className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center mr-7 sm:mb-0 border-r border-r-cyan-600 pr-3">
          <li aria-current="page">
            <div className="flex items-center">
              <NavLink
                to={"/" + getUrlArray()[1] + "/chart"}
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >
                <button
                  id="dropdownDatabase"
                  data-dropdown-toggle="dropdown-database"
                  className="inline-flex items-center text-sm font-normal text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-white text-cyan-800 dark:focus:ring-gray-700"
                >
                  <svg
                    className="w-3 h-3 me-2 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 16 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.1"
                      d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667"
                    />
                  </svg>
                  View Chart
                </button>
              </NavLink>
            </div>
          </li>
        </ol>

        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <NavLink
              to="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              {t("home")}
            </NavLink>
          </li>
          {links.map((link: any, key: any) => (
            <li key={key}>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>

                <NavLink
                  to={link.link && "/" + getUrlArray()[1] + link.link}
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  {link.title}
                </NavLink>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
