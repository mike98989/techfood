import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DailyHygieneRounds from "../components/Tables/DailyHygieneRoundsTable";
import { useTranslation } from "react-i18next";

const StaffingOfProduction = () => {
  const { t } = useTranslation();
  const pageTitle = t("daily_hygiene_rounds");
  return (
    <>
      <Breadcrumb
        links={[{ title: pageTitle, link: null }]}
        showNewButton={true}
        pageTitle={pageTitle}
      />
      <div className="">
        <DailyHygieneRounds />
      </div>
    </>
  );
};

export default StaffingOfProduction;
