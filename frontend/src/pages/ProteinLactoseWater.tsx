import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import ProteinLactoseWaterTable from "../components/Tables/ProteinLactoseWaterTable";
import { useTranslation } from "react-i18next";
const ProteinLactoseWater = () => {
  const { t } = useTranslation();
  const pageTitle = t("protein_lactose_water");
  return (
    <>
      <Breadcrumb
        links={[{ title: pageTitle, link: null }]}
        showNewButton={true}
        pageTitle={pageTitle}
      />
      <div className="flex flex-col gap-10">
        <ProteinLactoseWaterTable />
      </div>
    </>
  );
};

export default ProteinLactoseWater;
