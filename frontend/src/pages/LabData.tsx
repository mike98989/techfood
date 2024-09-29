import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import LabInputsTable from "../components/Tables/LabInputsTable";

const LabData = () => {
  return (
    <>
      <Breadcrumb pageName="Lab Results" />
      <div className="flex flex-col gap-10">
        <LabInputsTable />
      </div>
    </>
  );
};

export default LabData;
