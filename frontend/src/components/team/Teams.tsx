import React, { useState, useEffect, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateTeam from "./Create";
import Team from "./Team";
import EditTeam from "./Edit";
import styled from "styled-components";

const Teams: FC = (): JSX.Element => {
  const [teams, setTeams] = useState<[]>();
  const [teamDetailVisible, setTeamDetailVisible] = useState<boolean>(false);
  const [addTeamVisible, setAddTeamVisible] = useState<boolean>(false);
  const [editTeamVisible, setEditTeamVisible] = useState<boolean>(false);
  const [teamSelected, setTeamSelected] = useState<any>();

  const showAddTeamComponent = (): void => {
    setAddTeamVisible(true);
    setTeamDetailVisible(false);
    setEditTeamVisible(false);
  };

  const showTeamDetailComponent = (team: {}): void => {
    setTeamDetailVisible(true);
    setAddTeamVisible(false);
    setEditTeamVisible(false);
    setTeamSelected(team);
  };

  const showEditTeamComponent = (): void => {
    setEditTeamVisible(true);
    setTeamDetailVisible(false);
  };

  const deleteTeam = async (): Promise<void> => {
    await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/team/${teamSelected.id}`,
      {
        method: "delete",
      }
    );

    window.location.reload();
  };

  useEffect(() => {
    const fetchTeams = async (): Promise<void> => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/teams`
      );
      const results = await response.json();

      // Sort the results to get the Lead on the top
      results.forEach((res: { users: { role: number }[] }) => {
        res.users.sort(
          (a: { role: number }, b: { role: number }) => b.role - a.role
        );
      });
      setTeams(results);
    };
    fetchTeams();
  }, []);

  const Card = styled.div`
    &:hover {
      background: #cba4f95c;
      div {
        color: #5c0bbb;
      }
    }
  `;

  return (
    <>
      <section className="col-3">
        <div className="d-flex justify-content-between pb-4 pt-2 align-items-center">
          <b>Team List</b>

          <div
            onClick={showAddTeamComponent}
            className="nav-link text-reset text-center"
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon="user-plus" />
          </div>
        </div>
        <div className="">
          {teams &&
            teams.map((team: { id: number; name: string; users: any }) => (
              <Card
                onClick={() => showTeamDetailComponent(team)}
                className="py-3 text-reset text-decoration-none d-flex align-items-center"
                style={{ cursor: "pointer" }}
                key={team.id}
              >
                <div className="mx-4">
                  <FontAwesomeIcon icon="user" />
                </div>
                <div>
                  <b>{team.name}</b>
                  <br />
                  Leader : {team.users[0]?.firstname} {team.users[0]?.lastname}
                </div>
              </Card>
            ))}
        </div>
      </section>
      {addTeamVisible && <CreateTeam />}
      {teamDetailVisible && (
        <Team team={teamSelected} onClick={showEditTeamComponent} />
      )}
      {editTeamVisible && (
        <EditTeam
          onClick={() => setEditTeamVisible(false)}
          deleteTeam={deleteTeam}
        />
      )}
    </>
  );
};

export default Teams;
