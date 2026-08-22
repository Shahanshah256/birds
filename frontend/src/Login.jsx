import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  console.log(navigate);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });

      console.log(response.data);

      alert("Login successful");
      navigate("/student");
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Backend response:", error.response?.data);

      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="border p-4 rounded shadow-md w-96 mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-3">
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
