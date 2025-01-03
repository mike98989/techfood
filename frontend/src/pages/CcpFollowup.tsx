import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import CCPFollowUpTable from "../components/Tables/CCPFollowupTable";
import { useTranslation } from "react-i18next";

const CcpFollowup = () => {
  const { t } = useTranslation();
  const pageTitle = t("ccp_follow_up");
  return (
    <>
      <Breadcrumb
        links={[{ title: pageTitle, link: null }]}
        showNewButton={true}
        pageTitle={pageTitle}
      />
      <div className="">
        <CCPFollowUpTable />
      </div>
    </>
  );
};

export default CcpFollowup;
