import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import AuthorisedRoute from "./methods/AuthorisedRoute";
// import Calendar from "./pages/Calendar";
// import Chart from "./pages/Chart";
import Index from "./pages/Dashboard/Index";
import FormElements from "./pages/Form/FormElements";
//import Profile from "./pages/Profile";
//import Settings from "./pages/Settings";
import ProteinLactoseWater from "./pages/ProteinLactoseWater";
import FruitProduction from "./pages/FruitProduction";
import DrillSamples from "./pages/DrillSamples";
import HeadMidriff from "./pages/HeadMidRiff";
import CCPFollowUp from "./pages/CcpFollowup";
import OEEFollowUpEfficiency from "./pages/OEEFollowup";
import ProductivityFollowUp from "./pages/ProductivityFollowup";
import StaffingProduction from "./pages/StaffingProduction";
import HygieneRounds from "./pages/HygieneRounds";
import NewProductivityFollowUp from "./pages/Form/NewProductivityFollowUp";
import NewStaffingProduction from "./pages/Form/NewStaffingProduction";
import NewCCPFollowUp from "./pages/Form/NewCCPFollowUp";
import NewOEEFollowUp from "./pages/Form/NewOEEFollowUp";
import NewProteinLactosWater from "./pages/Form/NewProteinLactoseWater";
import NewFruitProduction from "./pages/Form/NewFruitProduction";
import DeviationComplaints from "./pages/DeviationComplaints";
import NewDeviationComplaint from "./pages/Form/NewDeviationComplaints";
import NewHygieneRound from "./pages/Form/NewHygieneRound";
import NewDrillSample from "./pages/Form/NewDrillSample";
import NewHeadMidriff from "./pages/Form/NewHeadMidriff";
import NewMapDetectedBacteria from "./pages/Form/NewMapDetectedBacteria";
import ProteinLactoseMainChart from "./pages/Charts/ProteinLactoseWaterChartPage";
import DrillSampleMainChart from "./pages/Charts/DrillSampleChartPage";
import FruitProductionMainChart from "./pages/Charts/FruitProductionChartPage";
import DeviationComplaintMainChart from "./pages/Charts/DeviationComplaintChartPage";
import HeadMidriffMainChart from "./pages/Charts/HeadMidChartPage";
import CCPFollowUpMainChart from "./pages/Charts/CCPFollowUpChartPage";
import StaffingProductionMainChart from "./pages/Charts/StaffingProductionChartPage";
import OEEFollowUpMainChart from "./pages/Charts/OEEFollowUpChartPage";
import HygieneRoundsMainChart from "./pages/Charts/HygieneRoundsChartPage";
import ProductivityMainChart from "./pages/Charts/ProductivityFollowUpChartPage";
import MapDetectedBacteria from "./pages/MapDetectedBacteria";
import Settings from "./pages/Settings";

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
                        <AuthorisedRoute>
                          <ProteinLactoseWater />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  />

                  <Route
                    path="new"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <NewProteinLactosWater />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  ></Route>

                  <Route
                    path="chart"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <ProteinLactoseMainChart />
                        </AuthorisedRoute>
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
                        <AuthorisedRoute>
                          <FruitProduction />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <NewFruitProduction />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  ></Route>

                  <Route
                    path="chart"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <FruitProductionMainChart />
                        </AuthorisedRoute>
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
                        <AuthorisedRoute>
                          <DeviationComplaints />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <NewDeviationComplaint />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  ></Route>
                  <Route
                    path="chart"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <DeviationComplaintMainChart />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  ></Route>
                </Route>

                {/* Drill Samples */}
                <Route path="drill_samples">
                  <Route
                    path=""
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <DrillSamples />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <NewDrillSample />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  ></Route>

                  <Route
                    path="chart"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <DrillSampleMainChart />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  ></Route>
                </Route>

                {/* Slaughter Head Meat/Midriff */}
                <Route path="head_midriff">
                  <Route
                    path=""
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <HeadMidriff />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <NewHeadMidriff />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  ></Route>

                  <Route
                    path="chart"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <HeadMidriffMainChart />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  ></Route>
                </Route>

                {/* CCP Follow up */}
                <Route path="ccp_followup">
                  <Route
                    path=""
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <CCPFollowUp />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <NewCCPFollowUp />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  ></Route>

                  <Route
                    path="chart"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <CCPFollowUpMainChart />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  ></Route>
                </Route>

                {/* Staffing of Production */}
                <Route path="staffing_production">
                  <Route
                    path=""
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <StaffingProduction />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <NewStaffingProduction />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  ></Route>

                  <Route
                    path="chart"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <StaffingProductionMainChart />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  ></Route>
                </Route>

                {/* OEE Followup and Efficiency */}
                <Route path="oee_and_efficiency">
                  <Route
                    path=""
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <OEEFollowUpEfficiency />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <NewOEEFollowUp />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  ></Route>

                  <Route
                    path="chart"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <OEEFollowUpMainChart />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  ></Route>
                </Route>

                {/* Daily Hygiene Round */}
                <Route path="daily_hygiene_rounds">
                  <Route
                    path=""
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <HygieneRounds />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <NewHygieneRound />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  ></Route>

                  <Route
                    path="chart"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <HygieneRoundsMainChart />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  ></Route>
                </Route>

                {/* Suggestions for maps with detected Bacteria */}
                <Route path="map_detected_bacteria">
                  <Route
                    path=""
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <MapDetectedBacteria />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <NewMapDetectedBacteria />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  ></Route>
                </Route>

                {/* Follow up of productivity */}
                <Route path="followup_of_productivity">
                  <Route
                    path=""
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <ProductivityFollowUp />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <NewProductivityFollowUp />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  ></Route>
                  <Route
                    path="chart"
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <AuthorisedRoute>
                          <ProductivityMainChart />
                        </AuthorisedRoute>
                      </DefaultLayout>
                    }
                  ></Route>
                </Route>

                {/* Settings */}
                <Route path="settings">
                  <Route
                    path=""
                    element={
                      <DefaultLayout>
                        <PageTitle title="Techfood Portal - Digital lab computations" />
                        <Settings />
                      </DefaultLayout>
                    }
                  />
                </Route>
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
