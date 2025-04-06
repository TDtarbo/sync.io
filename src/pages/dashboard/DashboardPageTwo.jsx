import { useEffect, useState } from "react";
import { getDocTitle } from "../../helpers/title";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const DashboardPage = () => {
  const location = useLocation();
  const [data, setData] = useState([])

  const navigate = useNavigate()

  const apiPrivate = useAxiosPrivate()

  useEffect(() => {
    document.title = getDocTitle(location);
  }, []);


  const goto = () => {
    navigate("/dashboardtwo")
  }

  const getUserData = async () => {
    
    try {

      const response = await apiPrivate.get("api/freelancer/all");
      console.log(response.data);
      setData(response.data)

    } catch (error) {
      console.error(error.status);
      localStorage.setItem("loginRedirect", location.pathname);
      navigate("/sign_in", { replace: true })
    }
  };

  return (
    <>
      <h1>Dashboard One</h1>
      {
      
      data.map((user, i) => {
        return <li key={i}>{user.firstName}</li>
      })
      
      }

      <button onClick={() => getUserData()}>Get User Data</button>
      <button onClick={() => goto()}>Go to Dashboard 2</button>
    </>
  );
};

export default DashboardPage;
