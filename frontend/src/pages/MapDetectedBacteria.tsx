import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import MapDetectedBacteriaTable from "../components/Tables/MapDetectedBacteriaTable";
import { useTranslation } from "react-i18next";

const MapDetectedBacteria = () => {
  const { t } = useTranslation();
  const pageTitle = t("map_detected_bacteria_title");
  return (
    <>
      <Breadcrumb
        links={[{ title: pageTitle, link: null }]}
        showNewButton={true}
        pageTitle={pageTitle}
      />
      <div className="">
        <MapDetectedBacteriaTable />
      </div>
    </>
  );
};

export default MapDetectedBacteria;
