import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import HeadMidRiffTable from "../components/Tables/HeadMidRiffTable";
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
        <HeadMidRiffTable />
      </div>
    </>
  );
};

export default CcpFollowup;
