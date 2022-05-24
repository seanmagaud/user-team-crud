import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditTeamProps } from "../../@types/teams.d";

const EditTeam: FC<EditTeamProps> = ({ onClick, deleteTeam }): JSX.Element => {
  return (
    <section className="col-2">
      <div className="d-flex justify-content-between pb-4 pt-2 align-items-center">
        <b>Edit Team</b>

        <span
          onClick={onClick}
          className="nav-link text-reset text-center"
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon="save" />
        </span>
      </div>

      <span
        onClick={deleteTeam}
        className="nav-link text-reset text-center"
        style={{ cursor: "pointer" }}
      >
        Delete Team
      </span>
    </section>
  );
};

export default EditTeam;
