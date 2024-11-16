import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
// import Calendar from "./pages/Calendar";
// import Chart from "./pages/Chart";
import Index from "./pages/Dashboard/Index";
import FormElements from "./pages/Form/FormElements";
//import Profile from "./pages/Profile";
//import Settings from "./pages/Settings";
import ProteinLactoseWater from "./pages/ProteinLactoseWater";
import FruitProduction from "./pages/FruitProduction";
import DrillSamples from "./pages/DrillSamples";
import NewProteinLactosWater from "./pages/Form/NewProteinLactoseWater";
import NewFruitProduction from "./pages/Form/NewFruitProduction";
import DeviationComplaints from "./pages/DeviationComplaints";
import NewDeviationComplaint from "./pages/Form/NewDeviationComplaints";
import ProteinLactoseMainChart from "./pages/Charts/ProteinLactoseWaterChartPage";
import FruitProductionMainChart from "./pages/Charts/FruitProductionChartPage";
import DeviationComplaintMainChart from "./pages/Charts/DeviationComplaintChartPage";

// import Alerts from "./pages/UiElements/Alerts";
// import Buttons from "./pages/UiElements/Buttons";
import DefaultLayout from "./layout/DefaultLayout";
import ContentLayout from "./layout/ContentLayout";
import Cookies from "js-cookie";
import ProtectedRoute from "./methods/ProtectedRoute";
import { useDispatch } from "react-redux";
import { setUser } from "./methods/reducers/user";
import { useSelector } from "react-redux";
import FormLayout from "./pages/Form/FormLayout";
import { useTranslation } from "react-i18next";
import { httpRequest } from "./methods/Requests";

//import LanguageDropDown from "./components/Dropdowns/LanguageDropDown";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const user = useSelector((state: any) => state.user.value);
  const { t, i18n } = useTranslation();
  const language = useSelector((state: any) => state.language.value);
  const { fetchApi } = httpRequest();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const userData = localStorage.getItem("user_data"); // Assuming you set this as a cookie
    const userToken = localStorage.getItem("token"); // Assuming you set this as a cookie
    if (userData) {
      // Parse user data from JSON string
      dispatch(
        setUser({ data: JSON.parse(userData), token: userToken?.trim() })
      );
      // You might also want to set the token in your Axios headers
    }
  }, [dispatch]);

  //////////Fetch Translations from DB
  useEffect(() => {
    // Fetch the translations from your API
    const fetchTranslations = async () => {
      fetchApi({
        url: "translations", // URL end point
        method: "GET", // Method
        formData: null, //Form Data
        contentType: "application/json", // Content Type
        authentication: "", // Authentication
      }).then((response_value: any) => {
        const response = JSON.parse(response_value);
        //try {
        // const response = await fetch("translations"); // Adjust to your API endpoint
        const trimmedString = response.data[0].translation.trim(); // "Your JSON response with spaces"
        const noLineBreaksString = trimmedString.replace(/[\r\n]+/g, "");
        const cleanedString = noLineBreaksString.replace(/'/g, '"');

        //const translations = JSON.parse(JSON.stringify(noLineBreaksString));
        const translationKeys: any = {};
        try {
          const jsonObject = JSON.parse(cleanedString);
          // Extract keys for each language
          // Add languages to i18n resources
          Object.keys(jsonObject).forEach((lang) => {
            i18n.addResourceBundle(lang, "translation", jsonObject[lang]);
          });
        } catch (error) {
          console.error("Failed to parse JSON:", error);
        }

        // Optionally change the language to what was fetched
        i18n.changeLanguage(i18n.language);
      });
    };
    fetchTranslations();
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language.language);
    setTimeout(() => setLoading(false), 1000);
  }, [language.language]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/auth/signin"
          element={
            <ContentLayout>
              <PageTitle title="Signin | Techfood Portal - Digital lab computations" />
              <SignIn />
            </ContentLayout>
          }
        />

        {/* <Route
          path="/auth/signup"
          element={
            <ContentLayout>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </ContentLayout>
          }
        /> */}

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute isAuthenticated={user.data}>
              <Routes>
                <Route
                  path=""
                  element={
                    <DefaultLayout>
                      <PageTitle title="Techfood Portal - Digital lab computations" />
                      <Index />
                    </DefaultLayout>
                  }
                />
                {/* Protein Lactose And Water Content */}
                <Route path="protein_lactose_water">
                  <Route
                    path=""
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <ProteinLactoseWater />
                      </DefaultLayout>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <NewProteinLactosWater />
                      </DefaultLayout>
                    }
                  ></Route>

                  <Route
                    path="chart"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <ProteinLactoseMainChart />
                      </DefaultLayout>
                    }
                  ></Route>
                </Route>

                {/* Fruit Production */}
                <Route path="fruit_production">
                  <Route
                    path=""
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <FruitProduction />
                      </DefaultLayout>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <NewFruitProduction />
                      </DefaultLayout>
                    }
                  ></Route>

                  <Route
                    path="chart"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <FruitProductionMainChart />
                      </DefaultLayout>
                    }
                  ></Route>
                </Route>

                {/* Deviation Complaints */}
                <Route path="deviation_complaints">
                  <Route
                    path=""
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <DeviationComplaints />
                      </DefaultLayout>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <NewDeviationComplaint />
                      </DefaultLayout>
                    }
                  ></Route>
                  <Route
                    path="chart"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <DeviationComplaintMainChart />
                      </DefaultLayout>
                    }
                  ></Route>
                </Route>

                {/* Fruit Production */}
                <Route path="drill_samples">
                  <Route
                    path=""
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <DrillSamples />
                      </DefaultLayout>
                    }
                  />
                  {/* <Route
                    path="new"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <NewDrillSample />
                      </DefaultLayout>
                    }
                  ></Route> */}

                  {/* <Route
                    path="chart"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <DrillSampleMainChart />
                      </DefaultLayout>
                    }
                  ></Route> */}
                </Route>
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>

    // <DefaultLayout>
    //   <Routes>
    //     <Route
    //       index
    //       element={
    //         <>
    //           <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
    //           <ECommerce />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/calendar"
    //       element={
    //         <>
    //           <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
    //           <Calendar />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/profile"
    //       element={
    //         <>
    //           <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
    //           <Profile />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/forms/form-elements"
    //       element={
    //         <>
    //           <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
    //           <FormElements />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/forms/form-layout"
    //       element={
    //         <>
    //           <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
    //           <FormLayout />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/tables"
    //       element={
    //         <>
    //           <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
    //           <Tables />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/settings"
    //       element={
    //         <>
    //           <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
    //           <Settings />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/chart"
    //       element={
    //         <>
    //           <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
    //           <Chart />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/ui/alerts"
    //       element={
    //         <>
    //           <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
    //           <Alerts />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/ui/buttons"
    //       element={
    //         <>
    //           <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
    //           <Buttons />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/auth/signin"
    //       element={
    //         <>
    //           <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
    //           <SignIn />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/auth/signup"
    //       element={
    //         <>
    //           <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
    //           <SignUp />
    //         </>
    //       }
    //     />
    //   </Routes>
    // </DefaultLayout>
  );
}

export default App;
