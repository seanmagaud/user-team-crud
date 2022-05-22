import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type UserType = {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  teams: string;
};

interface UserProps {
  user: UserType;
  onClick: any;
  demote: any;
  promote: any;
}

const EditUser: FC<UserProps> = ({
  user,
  onClick,
  demote,
  promote,
}): JSX.Element => {
  return (
    <section className="col-2">
      <div className="d-flex justify-content-between pb-4 pt-2 align-items-center">
        <b>Edit User</b>

        <span
          onClick={onClick}
          className="nav-link text-reset text-center"
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon="save" />
        </span>
      </div>

      <span
        onClick={demote}
        className="nav-link text-reset text-center"
        style={{ cursor: "pointer" }}
      >
        Demote user
      </span>
      <span
        onClick={promote}
        className="nav-link text-reset text-center"
        style={{ cursor: "pointer" }}
      >
        Promote user
      </span>
      {/* <div className="">
        {user && (
          <>
            <b>Fist name</b>
            <p>{firstname}</p>
            <b>Last name</b>
            <p>{lastname}</p>
            <b>Email</b>
            <p>{email}</p>
            <b>Role</b>
            <p>{role}</p>

            <b>Teams</b>
            <p>{teams}</p>
          </>
        )}
      </div> */}
    </section>
  );
};

export default EditUser;
