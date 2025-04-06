import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../../../common/components/LoadingSpinner.jsx";
import { motion } from "framer-motion";
import api from "../../../helpers/axios";
import RequiredFelid from "../../../common/components/RequiredFelid.jsx";
import { Link } from "react-router-dom";
import { useAlert } from "@tdtarbo/react-alert";

const SignInForm = () => {

  const { alert, sendAlert } = useAlert()  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const ref = useRef()

  useEffect(() => {
    ref.current.focus()
  }, [])

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const validateForm = () => {
    if (!email.trim()) {
      return "required!";
    } else if (!/\S+@\S+\.\S+/.test(email)) return "invalid email!";
  };

  const handleButtonClick = async () => {

    const newError = validateForm();

    if (newError) {
      setError(newError);
      return;
    }

    setError("");
    setIsLoading(true);


    try {

      console.log(email);

      await api.post("/api/auth/verify", {
        email: email,
      });

      sendAlert(
        {
          type: alert.success, 
          title: alert.text.success.actionCompleted,
          description: alert.text.custom("We've sent a verification link to your email"),
          btn: {title: "Ok"}
        }
      )
      
      setEmail("");

        
    } catch (error) {

      console.error(error);
      sendAlert(
        {
          type: alert.error, 
          title: alert.text.error.actionFailed,
          description: alert.text.custom("Something went wrong. Please try again! "),
          btn: {title: "Ok"}
        }
      )
      
    }

    
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex m-auto shadow-2xl rounded-2xl max-lg:w-[90%] max-xl:w-[80%] xl:w-[1100px]"
    >
      <div className="w-[50%] flex flex-col items-center justify-center max-xl:w-[100%] max-lg:rounded-2xl bg-white rounded-l-box border p-10 h-[60vh]">
        <div className="mx-auto w-[80%] max-xl:w-[90%]">
          <img
            alt="Your Company"
            src="/logo/logo_main.svg"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Welcome Back
          </h2>
        </div>
        <div className="mt-10 mx-auto w-[80%] max-xl:w-[90%]">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address {error && <RequiredFelid message={error} />}
              </label>
              <div className="mt-2">
                <input
                  ref={ref}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => handleInputChange(e)}
                  className="input-felid"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleButtonClick}
                disabled={isLoading}
                className={`form-button ${
                  isLoading && "cursor-not-allowed hover:bg-indigo-600"
                }`}
              >
                {isLoading ? <LoadingSpinner /> : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            New to sync.io ?
            <Link
              className="font-semibold text-indigo-600 hover:text-indigo-500 ml-3"
              to="/sign_up"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <div className="w-[50%] p-10 flex flex-col justify-center items-center max-lg:hidden rounded-r-box max-xl:py-16 bg-indigo-600 bg-[url('/logo/welcome_blob.svg')] bg-no-repeat bg-cover">
        <img src="/logo/logo.svg" alt="" className="xl:w-[60%]" />
      </div>
    </motion.div>
  );
};

export default SignInForm;
