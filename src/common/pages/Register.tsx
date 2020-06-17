/**
 * Register page to create a new user
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import React from "react";

const Register: React.FC = () => {
  return (
    <>
      <h1 className="text--serif text--center">Register</h1>
      <div className="form--auth">
        <form className="form form--light">
          <label>Username or email address</label>
          <input
            type="text"
            name="login"
            id="login_field"
            className="form__control form__input"
            tabIndex={1}
            autoComplete="username"
          />
          <label>Password</label>
          <input
            type="password"
            name="login"
            id="login_field"
            className="form__control form__input"
            tabIndex={1}
            autoComplete="username"
          />
          <button className="btn btn--primary btn--block">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
