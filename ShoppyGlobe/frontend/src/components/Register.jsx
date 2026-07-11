import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfimPassword] = useState("");

  async function getDetails(e) {
    e.preventDefault();
    // console.log(name, email, password, confirmPassword);

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      return alert("Please fill all the fields");
    } else {
      return alert("Details added");
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={getDetails}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Confrim Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfimPassword(e.target.value);
          }}
        />
        <button>Register</button>
      </form>
      <Link to="/login">
        <p>Already have an account? Login</p>
      </Link>
    </div>
  );
}
