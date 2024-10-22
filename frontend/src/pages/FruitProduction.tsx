import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import FruitProductionTable from "../components/Tables/FruitProductionTable";
import { useTranslation } from "react-i18next";

const FruitProduction = () => {
  const { t } = useTranslation();
  const pageTitle = t("fruit_production");
  return (
    <>
      <Breadcrumb
        links={[{ title: pageTitle, link: null }]}
        showNewButton={true}
        pageTitle={pageTitle}
      />
      <div className="">
        <FruitProductionTable />
      </div>
    </>
  );
};

export default FruitProduction;
