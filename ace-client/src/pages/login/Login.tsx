import React, { useState } from "react";
//import { Grid, TextField, Button } from "@material-ui/core";
import { TextField, Button } from "@mui/material";
import { InputBase, Stack, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import "bulma/css/bulma.min.css";
import { isVariableDeclarationList } from "typescript";
import "./Login.css";
import Accordion from 'react-bootstrap/Accordion';
import logo from './img.png';

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
<div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-2"></div>
        <div className="col-lg-6 col-md-8 login-box">
          <div className="col-lg-12 login-key">
            {/* <img src="images/img.png" className="image-logo" alt="Italian Trulli" /> */}
            <img className="image-logo" src={logo} alt="Logo" />
          </div>
          <div className="col-lg-12 login-title">Login to OPEX Dashboard</div>
          <div className="col-lg-12 login-form">
            <div className="col-lg-12 login-form">
                <div className="form-group">

                <Accordion flush>
        <Accordion.Item eventKey="0">
            <Accordion.Header className="sso">Single Sign- On (SSO)</Accordion.Header>
            <Accordion.Body>
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
            <Accordion.Header className="username-password">Username / Password</Accordion.Header>
            <Accordion.Body>
            <div className="field mt-3">
                  <label>Email</label>
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
                  <label>Password</label>
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
                    className="btn btn-primary mb-3"
                    onClick={handleClick}
                  >
                    Login
                  </button>
                </div>
                {message && <span className="err">{message}</span>}
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>
                <div className="col-lg-12 loginbttm">
                  <div className="col-lg-6 login-btm login-text">
                  </div>
                </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-2"></div>
        </div>
        <div className="col-lg-3 col-md-2"></div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12 mid"></div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-2"></div>
        <div className="col-lg-6 bottom-title">
          2022 Ace Resource Advisory Services Sdn Bhd
        </div>
        <div className="col-lg-3 col-md-2"></div>
      </div>
    </div>
      {/* -------------------- */}
      {/* <section className="hero has-background-grey-light is-fullheight is-fullwidth">
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
      </section> */}
    </div>
    </div>
  );
};

export default LoginPage;
