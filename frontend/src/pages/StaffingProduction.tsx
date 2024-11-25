import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import StaffingProduction from "../components/Tables/StaffingProductionTable";
import { useTranslation } from "react-i18next";

const StaffingOfProduction = () => {
  const { t } = useTranslation();
  const pageTitle = t("staffing_of_production");
  return (
    <>
      <Breadcrumb
        links={[{ title: pageTitle, link: null }]}
        showNewButton={true}
        pageTitle={pageTitle}
      />
      <div className="">
        <StaffingProduction />
      </div>
    </>
  );
};

export default StaffingOfProduction;
