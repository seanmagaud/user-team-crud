import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

type UserSubmitForm = {
  firstname: string;
  lastname: string;
  email: string;
};

const CreateUser: FC = () => {
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("firstname is required"),
    lastname: Yup.string().required("lastname is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data: UserSubmitForm): Promise<void> => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/user/`,
      {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
        body: JSON.stringify({ user: data }),
      }
    );

    if (response.ok) {
      window.location.reload();
    } else {
      alert("email already used !");
    }
  };

  return (
    <section className="col-2">
      <div className="d-flex pb-4 pt-2 align-items-center">
        <b>Create User</b>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Firstname</label>
          <input
            type="text"
            {...register("firstname")}
            className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.firstname?.message}</div>
        </div>

        <div className="form-group">
          <label>Lastname</label>
          <input
            type="text"
            {...register("lastname")}
            className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.lastname?.message}</div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-info">
            Create
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateUser;
