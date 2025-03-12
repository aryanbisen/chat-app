import { Button } from "react-bootstrap";
import { login } from "../service/AuthService";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";

function Loginpage() {
  const [identifier, setidentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await login(identifier, password);
    console.log(data);
    
    if (await login(identifier, password)) {
      console.log("logged in succesfully.");
      dispatch({ type: "USER_LOGIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chats");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} action="/login" method="POST">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="identifier">
              Email or username
            </label>
            <input
              onChange={(e) => setidentifier(e.target.value)}
              id="identifier"
              name="identifier"
              type="text"
              placeholder="Email address or username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-150 ease-in-out"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              required
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-150 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Noch kein Konto?{" "}
          <a href="#" className="text-indigo-500 hover:underline">
            Registrieren
          </a>
        </p>
      </div>
    </div>
  );
}

export default Loginpage;
