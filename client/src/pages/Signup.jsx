import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("")
  const [refreshToken, setRefreshToken] = useState("")

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

    if (password.length < 8) {
      toast.error("password must be at least 8 letters");
      return false;
    }

    return true;
  };

  const post_user = () => {

    if (!validate_data()) {
      return;
    }

    const PATH = import.meta.env.VITE_NODE_ENV === "Development" ? "http://localhost:3000/auth/signup" : "/auth/signup"

    // post new user
    axios
      .post(PATH, {
        email: email,
        password: password,
      })
      .then((res) => {

        console.log(res.data);

        // accessToken
        setAccessToken(res.data.data.accessToken)

        // refreshToken
        setRefreshToken(res.data.data.refreshToken)

        console.log(res.data.data.accessToken)

        document.cookie = `accessToken=${res.data.data.accessToken}`;
        document.cookie = `refreshToken=${res.data.data.refreshToken}`;

        toast.success("signed up successfull");

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
            Sign Up
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                      post_user();
                  }}
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
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                      post_user();
                  }}
              />
            </div>

            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
              onClick={post_user}
            >
              Sign Up
            </button>
          </div>
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?
            <Link
              to={"/signin"}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              {" "}
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
