/**
 * Register page to create a new user
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Formik } from "formik";

export const REGISTER_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      success
      message
    }
  }
`;

const Register: React.FC = () => {
  const [registerUser, { loading, data }] = useMutation(REGISTER_USER);

  return (
    <>
      <h1 className="text--serif text--center">Register</h1>
      <div className="form--auth">
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            registerUser({ variables: values });
            setSubmitting(false);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {
            console.log(data);
            return (
              <form className="form form--light" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  className="form__control form__input"
                  value={values.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <label>Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  className="form__control form__input"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form__control form__input"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button
                  type="submit"
                  className="btn btn--primary btn--block"
                  disabled={isSubmitting}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default Register;
