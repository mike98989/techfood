import React, { lazy, Suspense, ReactNode } from "react";
import EditHygieneRounds from "../pages/Form/Edit/EditHygieneRound";
import EditMapDetectedBacteria from "../pages/Form/Edit/EditMapDetectedBacteria";
import ProductivityFollowUp from "../pages/ProductivityFollowup";

// Create a map of components using React.lazy
const LazyComponentMap: Record<string, React.LazyExoticComponent<any>> = {
  StaffingProductionModal: lazy(
    () => import("../pages/Views/StaffingProductionModal")
  ),
  ProductivityFollowUpModal: lazy(
    () => import("../pages/Views/ProductivityFollowUpModal")
  ),
  EditFruitProduction: lazy(
    () => import("../pages/Form/Edit/EditFruitProduction")
  ),
  EditDeviationComplaint: lazy(
    () => import("../pages/Form/Edit/EditDeviationComplaint")
  ),
  EditHeadMidriff: lazy(() => import("../pages/Form/Edit/EditHeadMidriff")),
  EditProteinLactoseWater: lazy(
    () => import("../pages/Form/Edit/EditProteinLactoseWater")
  ),
  EditStaffingProduction: lazy(
    () => import("../pages/Form/Edit/EditStaffingProduction")
  ),
  EditProductivityFollowUp: lazy(
    () => import("../pages/Form/Edit/EditProductivityFollowUp")
  ),
  EditDrillSample: lazy(() => import("../pages/Form/Edit/EditDrillSample")),
  //EditCCPFollowUp: lazy(() => import("../pages/Form/Edit/EditCCPFollowUp")),
  EditOEEFollowUp: lazy(() => import("../pages/Form/Edit/EditOEEFollowUp")),
  EditHygieneRounds: lazy(() => import("../pages/Form/Edit/EditHygieneRound")),
  EditMapDetectedBacteria: lazy(
    () => import("../pages/Form/Edit/EditMapDetectedBacteria")
  ),
};
export default LazyComponentMap;
