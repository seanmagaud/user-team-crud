import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

type TeamSubmitForm = {
  name: string;
};

const CreateTeam: React.FC = () => {
  let navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamSubmitForm>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data: TeamSubmitForm): Promise<void> => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/team/`,
        {
          method: "post",
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json",
          }),
          body: JSON.stringify({ team: data }),
        }
      );

      if (response.ok) {
        navigate("/teams");
      } else {
        alert("email already used !");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            {...register("name")}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeam;
