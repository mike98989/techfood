import React, { lazy, Suspense, ReactNode } from "react";
import LazyComponentMap from "../../methods/LazyComponents";
// Create a map of components using React.lazy
// const componentMap: Record<string, React.LazyExoticComponent<any>> = {
//   StaffingProductionModal: lazy(
//     () => import("../../pages/Views/StaffingProductionModal")
//   ),
//   EditFruitProduction: lazy(
//     () => import("../../pages/Form/Edit/EditFruitProduction")
//   ),
// };

// Wrapper for rendering dynamically loaded components
const DynamicComponentLoader = ({
  componentPath,
  componentData,
}: {
  componentPath: string;
  componentData?: Record<string, any>;
}) => {
  const loadComponent = (name: string): ReactNode => {
    const Component = LazyComponentMap[name];
    if (Component) {
      return <Component componentData={componentData} />;
    } else {
      throw new Error(`Component "${name}" not found.`);
    }
  };

  let ComponentToRender;
  try {
    console.log("component", componentPath);
    ComponentToRender = loadComponent(componentPath);
  } catch (error) {
    console.error(error);
    return <div>Error: Unable to load the component.</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>{ComponentToRender}</Suspense>
  );
};

export default DynamicComponentLoader;
