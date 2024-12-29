import { useTranslation } from "react-i18next";

const NotPurchased = (props: any) => {
  const { t } = useTranslation();

  return (
    <section className="">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-shopping-bag justify-self-center"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <p className="mb-2 text-xl tracking-tight font-bold text-gray-900 md:text-xl dark:text-white">
            <span className="md:text-2xl">{props.title}</span>
            <br />
            <br />
            {t("you_havent_purchased_item")}
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            {t("one_click_below")}
          </p>
          <a
            href={props.link}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-bold rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 text-cyan-900"
          >
            {t("purchase_access")}
          </a>
        </div>
      </div>
    </section>
  );
};
export default NotPurchased;
