import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { useQuery } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
const SignIn = () => {
  const [, dispatch] = useStateValue();
  const navigate = useNavigate();

  // ***************************************************** fetch company info end *****************************************************

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    dispatch({ type: "SET_LOADING", status: true });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.Pswd
      );
      dispatch({ type: "SET_LOGIN_STATUS", status: true });

      toast.success("login successfully.");
      navigate("/patient");
    } catch (err) {
      console.log(err);
      toast.error("Failed to log in: " + err.message);
    }
    dispatch({ type: "SET_LOADING", status: false });
  };

  return (
    <div className="container d-flex flex-column">
      <div
        className="row align-items-center justify-content-center g-0
        min-vh-100"
      >
        <div className="col-12 col-md-8 col-lg-6 col-xxl-4 py-8 py-xl-0">
          {/* Card */}
          <div className="card smooth-shadow-md">
            {/* Card body */}
            <div className="card-body p-6 justify-content-center">
              <div className=" d-flex justify-content-center">
                {/* <h1>Task Trak</h1> */}
              </div>
              <div className="mb-4 d-flex justify-content-center">
                <div className="ju">
                  <img
                    src="../assets/images/brand/logo/LOGO.jpg"
                    className="mb-2 text-inverse"
                    style={{ height: "200px" }}
                    alt="Imaged"
                  />
                </div>
              </div>
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Username */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Login id"
                    required=""
                    {...register("email", {
                      required: "Email id is required",
                    })}
                  />
                  {errors.email && (
                    <div className="error">{errors.email.message}</div>
                  )}
                </div>
                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    {...register("Pswd", { required: "Password is required" })}
                  />
                  {errors.Pswd && (
                    <div className="error">{errors.Pswd.message}</div>
                  )}
                </div>
                {/* Checkbox */}
                <div
                  className="d-lg-flex justify-content-between align-items-center
                  mb-4"
                ></div>
                <div>
                  {/* Button */}
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
