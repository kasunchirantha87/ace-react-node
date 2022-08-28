import React, { useState } from "react";
import axios from "axios";
import { register } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { isVariableDeclarationList } from "typescript";
//import { useHistory } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  //const history = useHistory();

  const handleClick = (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (validation()) {
        register(name, email, password)
      .then(
        (response) => {
          return navigate("/");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
        }
      )
      .finally(() => {
        setLoading(false);
      });
    }
    function validation() {
      if (name === null || name === "") {
        setMessage("Please enter Name.");
        return false;
      }
      if (email === null || email === "") {
        setMessage("Please enter Email.");
        return false;
      }
      if (password === null || password === "") {
        setMessage("Please enter Password.");
        return false;
      }
      
      if (password !== confPassword) {
        setMessage("Password and Confirm Password does not match.");
        return false;
      }
      return true;
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              {/* <p className="has-text-centered">{msg}</p> */}
              <div className="login">
                <h3>Sign up</h3>
                </div>
              <div className="field mt-3">
                <label className="label">Name</label>
                <div className="controls">
                  <input
                    type="text"
                    className="input"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="field mt-2">
                <label className="label">Email</label>
                <div className="controls">
                  <input
                    type="text"
                    className="input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="field mt-2">
                <label className="label">Password</label>
                <div className="controls">
                  <input
                    type="password"
                    className="input"
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="field mt-2">
                <label className="label">Confirm Password</label>
                <div className="controls">
                  <input
                    type="password"
                    className="input"
                    placeholder="******"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="field mt-2">
                <button
                  className="button is-success is-fullwidth"
                  onClick={handleClick}
                >
                  Register
                </button>
              </div>
              <p>
                  Already Registered?
                  <span className="line">
                    <a href="/">Sign In</a>
                  </span>
                </p>
              {message && <span className='err'>{message}</span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
