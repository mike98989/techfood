import React, { useEffect, useState, lazy, Suspense } from "react";

const DynamicComponentLoader = ({
  componentPath,
  componentData,
}: {
  componentPath: string;
  componentData: Object;
}) => {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    const handleLoadComponent = async () => {
      try {
        // Dynamically import the component using the prop path
        const { default: LoadedComponent } = await import(`${componentPath}`);
        setComponent(() => LoadedComponent);
      } catch (error) {
        console.error("Error loading component:", error);
      }
    };

    handleLoadComponent();
  }, []);

  return (
    <div>
      {/* <button onClick={handleLoadComponent}>Load Component</button> */}
      <Suspense fallback={<div>Loading...</div>}>
        {Component && <Component componentData={componentData} />}
      </Suspense>
    </div>
  );
};

export default DynamicComponentLoader;
