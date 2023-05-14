import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import style from "./Contact.module.css";

export default function Contact() {
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("name is requried")
      .min(3, "name must be at least 3 characters")
      .max(10, "name can't be more than 10 characers"),
    email: Yup.string().required("email is requried").email("invalid email"),
    age: Yup.number()
      .required("age is requried")
      .min(18, "You must be at least 18 years old")
      .max(80, "You must be at most 80 years old"),
    phone: Yup.string()
      .required("phone is requried")
      .matches(/^01[0125][0-9]{8}$/, "invalid phone number"),
    password: Yup.string()
      .required("password is requried")
      .matches(/^[A-Z]/, "Password must start with capital letter"),
    rePassword: Yup.string()
      .required("confirming password is requried")
      .oneOf([Yup.ref("password")], "Password and Repassword must be the same"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: submitUserData,
  });

  function submitUserData(values) {
    console.log(values);
  }
  return (
    <>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <div className={`${style.contact_us} py-5`}>
        <div className="heading heading_lg">
          <h2 className="title">
            <i className="fa-solid fa-mobile-screen"></i>Contact <span>Us</span>
          </h2>
        </div>
        <form onSubmit={formik.handleSubmit} className={style.c_form}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <span className="text-danger field-error d-block">
                {formik.errors.name}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <span className="text-danger field-error d-block">
                {formik.errors.email}
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="age"
              id="age"
              className="form-control"
              placeholder="Age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.age && formik.touched.age ? (
              <span className="text-danger field-error d-block">
                {formik.errors.age}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              id="phone"
              className="form-control"
              placeholder="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <span className="text-danger field-error d-block">
                {formik.errors.phone}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <span className="text-danger field-error d-block">
                {formik.errors.password}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              className="form-control"
              placeholder="Confirm Password"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <span className="text-danger field-error d-block">
                {formik.errors.rePassword}
              </span>
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            className="btn btn-success"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
