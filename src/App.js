
import { BrowserRouter, Routes, Route, } from "react-router-dom";


import Signup from "./pages/Signup/Signup"
import Login from "./pages/Login/Login"
import Loader from "./components/UI/Loader";
import Dashboard from "./pages/Dashboard/Dashboard";
import Main from "./components/DashboardComponents/Main/Main";
import UserManagment from "./components/DashboardComponents/User Managment/UserManagment"
import Machines from "./components/DashboardComponents/Machines/Machines"
import Operators from "./components/DashboardComponents/Operators/Operators"
import Maintenance from "./components/DashboardComponents/Maintenance/Maintenance"
import Companies from "./components/DashboardComponents/Companies/Companies";
import JobSites from "./components/DashboardComponents/JobSites/JobSites";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Loader />} />
        <Route path="/dashboard" element={<Dashboard />}>
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="dashboard" element={<Main />} />
          <Route path="user-management" element={<UserManagment />} />
          <Route path="job-sites" element={<JobSites />} />
          <Route path="companies" element={<Companies />} />
          <Route path="machines" element={<Machines />} />
          <Route path="operators" element={<Operators />} />
          <Route path="maintenance" element={<Maintenance />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;