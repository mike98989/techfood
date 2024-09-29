import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import TableThree from "../components/Tables/LabInputsTable";

const LabData = () => {
  return (
    <>
      <Breadcrumb pageName="Lab Results" />

      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </>
  );
};

export default LabData;
