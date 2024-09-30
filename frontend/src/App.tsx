import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
// import Calendar from "./pages/Calendar";
// import Chart from "./pages/Chart";
import ECommerce from "./pages/Dashboard/ECommerce";
import FormElements from "./pages/Form/FormElements";
//import FormLayout from "./pages/Form/FormLayout";
// import Profile from "./pages/Profile";
// import Settings from "./pages/Settings";
import LabData from "./pages/LabData";
import ProteinLactosWater from "./pages/Form/Protein_lactos_water";

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

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const user = useSelector((state: any) => state.user.value);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    console.log("got heress");
    const userData = localStorage.getItem("user_data"); // Assuming you set this as a cookie
    if (userData) {
      // Parse user data from JSON string
      dispatch(setUser({ data: JSON.parse(userData) }));
      // You might also want to set the token in your Axios headers
    }
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/auth/signin"
          element={
            <ContentLayout>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </ContentLayout>
          }
        />

        <Route
          path="/auth/signup"
          element={
            <ContentLayout>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </ContentLayout>
          }
        />
      </Routes>

      <ProtectedRoute isAuthenticated={user.data}>
        <Routes>
          <Route
            index
            element={
              <DefaultLayout>
                <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ECommerce />
              </DefaultLayout>
            }
          />

          <Route
            path="/labdata"
            element={
              <DefaultLayout>
                <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <LabData />
              </DefaultLayout>
            }
          />

          <Route
            path="/protein_lactose_water"
            element={
              <DefaultLayout>
                <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ProteinLactosWater />
              </DefaultLayout>
            }
          />

          <Route
            path="/deviations_complaints"
            element={
              <DefaultLayout>
                <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormLayout />
              </DefaultLayout>
            }
          />
        </Routes>
      </ProtectedRoute>
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
