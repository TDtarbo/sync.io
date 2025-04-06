import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../helpers/axios";
import useAuth from "../../hooks/useAuth";
import { useAlert } from "@tdtarbo/react-alert";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const SignInProcess = () => {

  const { token } = useParams();
  const LOGIN_URL = `${API_URL}api/auth/login?token=${token}`

  const { setAuth } = useAuth()
  const {alert, sendAlert} = useAlert()

  const navigate = useNavigate();
  let redirectPath = "/home";
  const [error, setError] = useState(false);

  const refreshPage = () => {
    window.location.reload();
  }

  useEffect(() => {

    const signInWithMagicLink = async () => {

      const storedPath = localStorage.getItem("loginRedirect");
      localStorage.removeItem("loginRedirect")

      if (storedPath) {
        redirectPath = storedPath;
      }

      try {

        const response = await api.get(LOGIN_URL, { withCredentials: true });
        
        setAuth({
          accessToken: response.data.accessToken,
          user: {
            firstName: response.data.firstName, 
            lastName: response.data.lastName,
            profilePicture: response.data.profilePicture
          }
        })

        setTimeout(() => {

          navigate(redirectPath, { replace: true });
        }, 1000)

      } catch (error) {
        setError(true);

        console.error(error.code);

        if(error.code == "ERR_BAD_REQUEST") {

          sendAlert({
            type: alert.error,
            title: "Your login link is expired!",
            btn: {title: "Login", mandatoryAction: () => navigate("/sign_in")}
          })
          return

        }

        sendAlert({
          type: alert.error,
          title: "Unexpected error occurred"
        })

      }
    };

    const timer = setTimeout(() => {
      signInWithMagicLink();
    }, 200)

    return () => clearTimeout(timer)
  }, []);

  return (
    <div
      className="flex justify-center
    flex-col items-center bg-indigo-600 min-h-[100svh]"
    >
      <img className="absolute top-5 left-5 w-32" src="/logo/logo.svg" alt="" />

      {error ? (
        <div className="flex justify-center flex-col items-center">
          <h1 className="mb-14 text-white text-4xl font-bold">OOps!..</h1>
          <h2 className=" text-white text-xl text-center">
            Something went wrong please try again later.
          </h2>
          <button 
            className="text-white font-bold mt-10 bg-indigo-900 rounded-lg px-32 py-4 hover:bg-white hover:text-indigo-600 transition-all"
            onClick={() => refreshPage()}
            >
            Try Again
          </button>
        </div>
      ) : (
        <div className="flex justify-center flex-col items-center">
          <h1 className="mb-14 text-white text-4xl font-bold">Hold Tight!</h1>
          <h2 className="animate-pulse text-white text-xl text-center">
            We're working some magic behind the scenes...
          </h2>
        </div>
      )}
    </div>
  );
};

export default SignInProcess;
