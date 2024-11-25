import React, { lazy, Suspense, ReactNode } from "react";

// Create a map of components using React.lazy
const LazyComponentMap: Record<string, React.LazyExoticComponent<any>> = {
  StaffingProductionModal: lazy(
    () => import("../pages/Views/StaffingProductionModal")
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
  EditDrillSample: lazy(() => import("../pages/Form/Edit/EditDrillSample")),
};
export default LazyComponentMap;
