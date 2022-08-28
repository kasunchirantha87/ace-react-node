import React, { useState } from "react";
//import { Grid, TextField, Button } from "@material-ui/core";
import { TextField, Button } from "@mui/material";
import { InputBase, Stack, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import "bulma/css/bulma.min.css";
import { isVariableDeclarationList } from "typescript";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (validation()) {
      login(userName, password)
        .then(
          (response) => {
            return navigate("/dashboard");
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
      if (userName === null || userName === "") {
        setMessage("Please enter Email.");
        return false;
      }
      if (password === null || password === "") {
        setMessage("Please enter Password.");
        return false;
      }
      return true;
    }
  };

  return (
    <div>
      <section className="hero has-background-grey-light is-fullheight is-fullwidth">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4-desktop">
                <div className="login">
                <h3>Login</h3>
                </div>
                
                <div className="field mt-3">
                  <label className="label">Email</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Email"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-3">
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
                <div className="field mt-3">
                  <button
                    className="button is-success is-fullwidth"
                    onClick={handleClick}
                  >
                    Login
                  </button>
                </div>
                <p>
                  Need an Account?
                  <span className="line">
                    <a href="/register">Sign Up</a>
                  </span>
                </p>
                {message && <span className="err">{message}</span>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
