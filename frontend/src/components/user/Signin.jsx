import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate, signin } from "../../fetch/auth";
import "./user.css";

const Signin = ({ setUserDetails }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });
  const navigate = useNavigate();
  const { email, password, error, loading, didRedirect } = values;

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setUserDetails({
            email: data.user.email,
            name: data.user.name,
            authorID: data.user._id,
          });

          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch((e) => console.log("signin request failed ", e));
  };

  const handleChange = (name, event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  if (didRedirect) {
    return navigate("/home");
  }

  const ErrorMessage = () => {
    return (
      <div>
        <div>
          <div className="error" style={{ display: error ? "" : "none" }}>
            {error}
          </div>
        </div>
      </div>
    );
  };
  if (loading) {
    return <div className="lds-dual-ring"></div>;
  }

  return (
    <section className="signin">
      <div>
        <h2>Signin</h2>
      </div>
      <ErrorMessage />
      <form className="signin-form">
        <label>Email</label>
        <input
          onChange={(event) => handleChange("email", event)}
          value={email}
          type="email"
        />
        <label>Password</label>
        <input
          onChange={(event) => handleChange("password", event)}
          value={password}
          type="password"
        />
        <button onClick={onSubmit}>Submit</button>
      </form>
    </section>
  );
};

export default Signin;
