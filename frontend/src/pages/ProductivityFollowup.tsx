import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import OEEFollowUpTable from "../components/Tables/OEEFollowupTable";
import { useTranslation } from "react-i18next";

const OEEFollowup = () => {
  const { t } = useTranslation();
  const pageTitle = t("oee_and_efficiency");
  return (
    <>
      <Breadcrumb
        links={[{ title: pageTitle, link: null }]}
        showNewButton={true}
        pageTitle={pageTitle}
      />
      <div className="">
        <OEEFollowUpTable />
      </div>
    </>
  );
};

export default OEEFollowup;
