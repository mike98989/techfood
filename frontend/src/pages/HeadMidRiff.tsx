import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import HeadMidRiffTable from "../components/Tables/HeadMidRiffTable";
import { useTranslation } from "react-i18next";

const HeadMidRiff = () => {
  const { t } = useTranslation();
  const pageTitle = t("slaughtered_head_meat_midriff");
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

export default HeadMidRiff;
