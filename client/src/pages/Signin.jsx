import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API = "https://682199fa259dad2655afc100.mockapi.io/usersapi";

  const navigate = useNavigate();

  const redirect = () => {
    navigate("/");
  };

  const empty_input = () => {
    setEmail("");
    setPassword("");
  };

  const validate_data = () => {
    if (password == "" || email == "") {
      toast.error("all values must be filled");
      return false;
    }

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    if (!validateEmail(email)) {
      toast.error("invalid email");
      return false;
    }

    const custom_validate_email = (email) => {
      const domain = email.slice(email.indexOf("@") + 1, email.indexOf("."));
      return domain == "tuwaiq";
    };

    if (!custom_validate_email(email)) {
      toast.error("email domain name must be tuwaiq");
      return false;
    }

    return true;
  };

  const post_user = () => {
    // return if the data is not valid
    if (!validate_data()) {
      return;
    }

    // axios.get(API).then((res) => {
    //   // check if user exits
    //   const check_user = res.data.find((user) => {
    //     return user.email == email;
    //   });

    //   if (!check_user) {
    //     toast.error("user does not exists");
    //     return;
    //   }

    //   toast.success("signed in successfully")

    //   localStorage.setItem("username", check_user.username)
    //   localStorage.setItem("userType", check_user.type)
    //   localStorage.setItem("id", check_user.id)


    //   setTimeout(() => {
    //     redirect();
    //   }, 1000);

    //   console.log(check_user)

    // });

  };

  return (
    <div>
      <div>
        <ToastContainer position="top-center" reverseOrder={false} />
      </div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sigin In
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
              onClick={post_user}
            >
              Sign In
            </button>
          </div>
          <div className="mt-6 text-center text-sm text-gray-600">
            Not signed up?
            <Link
              to={"/signup"}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              {" "}
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
