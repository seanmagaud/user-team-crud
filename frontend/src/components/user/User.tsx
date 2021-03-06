import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserProps } from "../../@types/users.d";

const User: FC<UserProps> = ({ user, onClick }): JSX.Element => {
  const { firstname, lastname, email, role, teams } = user;

  function decodeRole(roleId: any) {
    let role: any = {
      1: "Intern",
      2: "Squad Member",
      3: "Squad Leader",
    };
    return role[roleId];
  }

  return (
    <section className="col-2">
      <div className="d-flex justify-content-between pb-4 pt-2 align-items-center">
        <b>User Detail</b>

        <div
          onClick={onClick}
          className="nav-link text-reset text-center"
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon="edit" />
        </div>
      </div>
      <div className="">
        {user && (
          <>
            <b>Fist name</b>
            <p>{firstname}</p>
            <b>Last name</b>
            <p>{lastname}</p>
            <b>Email</b>
            <p>{email}</p>
            <b>Role</b>
            <p>{decodeRole(role)}</p>

            <b>Teams</b>
            <p>
              {teams &&
                teams?.map((team: { id: number; name: string }) => (
                  <span className="mr-2" key={team.id}>
                    {team.name}
                  </span>
                ))}
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default User;
