import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import ProductivityFollowUpTable from "../components/Tables/ProductivityFollowupTable";
import { useTranslation } from "react-i18next";

const ProductivityFollowUp = () => {
  const { t } = useTranslation();
  const pageTitle = t("followup_of_productivity");
  return (
    <>
      <Breadcrumb
        links={[{ title: pageTitle, link: null }]}
        showNewButton={true}
        pageTitle={pageTitle}
      />
      <div className="">
        <ProductivityFollowUpTable />
      </div>
    </>
  );
};

export default ProductivityFollowUp;
