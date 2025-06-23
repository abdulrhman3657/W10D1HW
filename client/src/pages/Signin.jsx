import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const redirect = () => {
    navigate("/");
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

    return true;
  };

  const post_user = () => {
    // return if the data is not valid
    if (!validate_data()) {
      return;
    }

    const PATH = import.meta.env.VITE_NODE_ENV === "Development" ? "http://localhost:3000/auth/signin" : "/auth/signin"

    // post user data
    axios
      .post(PATH, {
        email: email,
        password: password,
      })
      .then((res) => {

        console.log(res.data);

        // accessToken
        // res.data.data.accessToken

        // refreshToken
        // res.data.data.refreshToken

        document.cookie = `accessToken=${res.data.data.accessToken}`;
        document.cookie = `refreshToken=${res.data.data.refreshToken}`;

        localStorage.setItem("email", email)

        toast.success("signed up successfully");

        setTimeout(() => {
          redirect();
        }, 1000);

      })
      .catch((error) => {
        console.log(error);
      });

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
