import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../features/auth";
import type { User } from "../data/user.type";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const navigate = useNavigate();

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userInput: User = {
      id: Date.now(),
      username,
      password,
      studentNumber,
      email: "",
      name: "",
      phoneNumber: "",
      image: "",
    };

    const success = register(userInput);

    if (success) {
      alert("Register success. Please log in.");
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md rounded bg-white p-8 shadow">
        <h2 className="mb-6 text-center text-2xl font-bold">Register</h2>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="mb-2 block text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              className="w-full rounded border px-3 py-2"
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              className="w-full rounded border px-3 py-2"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-gray-700" htmlFor="studentNumber">
              Student Number
            </label>
            <input
              className="w-full rounded border px-3 py-2"
              type="text"
              id="studentNumber"
              placeholder="Enter your student number"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
            />
          </div>

          <button
            className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
