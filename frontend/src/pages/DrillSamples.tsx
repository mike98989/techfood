import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DrillSamplesTable from "../components/Tables/DrillSamplesTable";
import { useTranslation } from "react-i18next";

const DrillSamples = () => {
  const { t } = useTranslation();
  const pageTitle = t("drill_samples");
  return (
    <>
      <Breadcrumb
        links={[{ title: pageTitle, link: null }]}
        showNewButton={true}
        pageTitle={pageTitle}
      />
      <div className="">
        <DrillSamplesTable />
      </div>
    </>
  );
};

export default DrillSamples;
