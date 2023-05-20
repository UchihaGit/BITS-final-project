import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../../fetch/auth";
import "./user.css";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;
  const handleChange = (name, event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(() => console.log("Error in signup"));
  };
  const SuccessMessage = () => {
    return (
      <div>
        <div>
          <div className="success" style={{ display: success ? "" : "none" }}>
            New account was created successfully. Please
            <Link to="/signin"> Login Here</Link>
          </div>
        </div>
      </div>
    );
  };
  const ErrorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="error" style={{ display: error ? "" : "none" }}>
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="signin">
      <div>
        <h2>
          Signup. Already have an account? <Link to="/signin">Signin</Link>
        </h2>
      </div>
      <ErrorMessage />
      <SuccessMessage />
      <form className="signin-form">
        <label>Name</label>
        <input
          onChange={(event) => handleChange("name", event)}
          type="text"
          value={name}
        />

        <label>Email</label>
        <input
          onChange={(event) => handleChange("email", event)}
          type="email"
          value={email}
        />

        <label>Password</label>
        <input
          onChange={(event) => handleChange("password", event)}
          type="password"
          value={password}
        />

        <button onClick={onSubmit}>Submit</button>
      </form>
    </section>
  );
};

export default Signup;
