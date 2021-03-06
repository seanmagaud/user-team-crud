import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditUserProps } from "../../@types/users.d";

const EditUser: FC<EditUserProps> = ({
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
    </section>
  );
};

export default EditUser;
