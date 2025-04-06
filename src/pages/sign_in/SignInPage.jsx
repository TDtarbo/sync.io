import { useEffect } from "react";
import SignInForm from "./components/SignInForm";
import { getDocTitle } from "../../helpers/title";

const SignInPage = () => {

  useEffect(() => {
    document.title = getDocTitle(location);
  }, []);

  return <div className="flex justify-center items-center bg-indigo-50 min-h-[100svh]">
    <SignInForm/>
  </div>;
};

export default SignInPage;
