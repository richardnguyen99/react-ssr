/**
 * Login page for user authentication
 */
import React, { useState } from "react";
import { Formik } from "formik";

import {
  useLoginUserMutation,
  UserQuery,
  UserDocument,
} from "@common/generated/graphql";
import { setAccessToken } from "@common/utils/tokenStore";
import { useHistory } from "react-router";

const Login: React.FC = () => {
  const [error, setError] = useState("");
  const history = useHistory();
  const [loginUser, { loading }] = useLoginUserMutation();

  return (
    <>
      <h1 className="text--serif text--center">Login</h1>
      <div className="form--auth">
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            const response = await loginUser({
              variables: {
                usrnameOrEmail: values.username,
                password: values.password,
              },
              update: (store, { data }) => {
                console.log(data);

                if (data && data.login && data.login.data) {
                  if (!data.login.success) {
                    setError(data.login.message);

                    return null;
                  }

                  store.writeQuery<UserQuery>({
                    query: UserDocument,
                    variables: {
                      username: data.login.data.username,
                    },
                    data: {
                      user: {
                        message: "fetched for user",
                        success: true,
                        data: {
                          email: data.login.data.email,
                          username: data.login.data.username,
                          _id: data.login.data._id,
                        },
                      },
                    },
                  });
                }
              },
            });

            if (response && response.data) {
              setAccessToken(response.data.login.token);
            }

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
                  {loading ? "Logging in..." : "Log in"}
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default Login;
