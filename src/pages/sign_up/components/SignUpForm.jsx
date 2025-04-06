import { useState } from "react";
import LoadingSpinner from "../../../common/components/LoadingSpinner";

import api from "../../../helpers/axios";
import RequiredFelid from "../../../common/components/RequiredFelid";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "@tdtarbo/react-alert";

const SignUpForm = () => {

    const { alert, sendAlert } = useAlert()

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
      fname: "",
      lname: "",
      email: "",
    });
  
    const handleInputChange = (e) => {

      const { name, value } = e.target;
      setErrors({
        ...errors,
        [name]: ""
      })

      setFormData((pre) => ({
        ...pre,
        [name]: value,
      }));

    };

    const validateForm = () => {
      let newErrors = {};

      if (!formData.fname.trim()) newErrors.fname = "required!";
      if (!formData.lname.trim()) newErrors.lname = "required!";
      if (!formData.email.trim()) newErrors.email = "required!";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "invalid email!";

      return newErrors;
    };

    const optionalAction = () => {
      navigate("/sign_in")
    }

    const handleButtonClick = async () => {

      const newErrors = validateForm();

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setIsLoading(true);
      
      try {

        await api.post("/api/freelancer/", 
          {
            firstName: formData.fname,
            lastName: formData.lname,
            email: formData.email,
          }
        );

        sendAlert(
          {
            type: alert.success, 
            title: alert.text.success.success,
            description: alert.text.custom("Glad to have you! 🔥 Log in and let’s get started!"),
            btn: {title: "Login", optionalAction: optionalAction}
          }
        )

        setFormData({fname: "",lname: "",email: "",});

      } catch (error) {

        sendAlert(
          {
            type: alert.error, 
            title: alert.text.error.somethingWentWrong,
            description: alert.text.custom("We're so sorry, something went wong in the sign up process."),
            btn: { title: "Cancel" }
          }
        )

        console.error(`${error.name}\n\n${error.message},\n${error.code} `);
      }

      setIsLoading(false);
    };

    return (
      <>
        <div className="w-[40%] flex flex-col justify-center items-center max-xl:w-[100%]  max-xl:py-16 max-xl:h-[100svh]">
          <div className="w-[90%] bg-white py-20 px-5 rounded-2xl border shadow-2xl">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
              <img
                alt="Your Company"
                src="/logo/logo_main.svg"
                className="mx-auto h-10 w-auto"
              />
              <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Welcome to sync.io
              </h2>
              <h2 className="mt-1 text-center text-sm tracking-tight text-gray-900">
                Get started - it's free.
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="fname"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    First Name{" "}
                    {errors.fname && <RequiredFelid message={errors.fname} />}
                  </label>
                  <div className="mt-2">
                    <input
                      id="fname"
                      name="fname"
                      type="text"
                      required
                      autoComplete="fname"
                      value={formData.fname}
                      onChange={(e) => handleInputChange(e)}
                      className={`input-felid`}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lname"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Last Name{" "}
                    {errors.lname && <RequiredFelid message={errors.lname} />}
                  </label>
                  <div className="mt-2">
                    <input
                      id="lname"
                      name="lname"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.lname}
                      onChange={(e) => handleInputChange(e)}
                      className="input-felid"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Email address{" "}
                    {errors.email && <RequiredFelid message={errors.email} />}
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
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
                Already a member?
                <Link
                  className="font-semibold text-indigo-600 hover:text-indigo-500 ml-3"
                  to="/sign_in"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
};

export default SignUpForm;
