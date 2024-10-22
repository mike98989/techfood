import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DeviationComplaintsTable from "../components/Tables/ProteinLactoseWaterTable";
import { useTranslation } from "react-i18next";

const DeviationComplaints = () => {
  const { t } = useTranslation();
  const pageTitle = t("deviation_complaints");
  return (
    <>
      <Breadcrumb
        links={[{ title: pageTitle, link: null }]}
        showNewButton={true}
        pageTitle={pageTitle}
      />
      <div className="flex flex-col gap-10">
        <DeviationComplaints />
      </div>
    </>
  );
};

export default DeviationComplaints;
