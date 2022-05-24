import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TeamProps } from "../../@types/teams.d";

const Team: FC<TeamProps> = ({ team, onClick }): JSX.Element => {
  const { name, users } = team;

  return (
    <section className="col-2">
      <div className="d-flex justify-content-between pb-4 pt-2 align-items-center">
        <b>Team Detail</b>

        <div
          onClick={onClick}
          className="nav-link text-reset text-center"
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon="edit" />
        </div>
      </div>
      <div className="">
        {team && (
          <>
            <b>Team</b>
            <p>{name}</p>
            <p>
              <span className="d-block">
                <b>Leader</b>
              </span>
              {users[0]?.firstname} {users[0]?.lastname}
            </p>
            <p>
              <span className="d-block">
                <b>Members</b>
              </span>
              {users[1]?.firstname} {users[2]?.lastname}
              <br />
              {users[2]?.firstname} {users[2]?.lastname}
            </p>
            <p>
              <span className="d-block">
                <b>Interns</b>
              </span>
              {users[3]?.firstname} {users[3]?.lastname}
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default Team;
