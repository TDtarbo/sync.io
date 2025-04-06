import { useEffect } from "react";
import KeyFeatures from "./components/KeyFeatures";
import LoginFrom from "./components/SignUpForm";
import { useLocation } from "react-router-dom";
import { getDocTitle } from "../../helpers/title";

const SignUpPage = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = getDocTitle(location);
  }, []);

  return (
    <>
      <div
        className="flex min-h-screen justify-center bg-white overflow-hidden bg-cover bg-no-repeat bg-right
        pl-56 gap-[10%] max-xl:flex-col max-xl:pl-0"
      >
        <LoginFrom />
        <KeyFeatures />
      </div>
    </>
  );
};

export default SignUpPage;
