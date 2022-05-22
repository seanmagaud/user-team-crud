import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const Team = () => {
  let { teamId } = useParams();
  const [team, setTeam] = useState<any>({});

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/team/${teamId}`
      );
      const json = await response.json();
      console.log(json);

      setTeam(json);
    };
    fetchData();
  }, [teamId]);

  return (
    <section className="">
      <div className="">
        {team && (
          <>
            <b>Team</b>
            <p>{team.name}</p>
            <b>Persons</b>
            <br />
            <b>Leader</b>
            <p>{team.leader}</p>
            <b>Members</b>
            <p>{team.members}</p>
            <b>Interns</b>
            <p>{team.interns}</p>
          </>
        )}
      </div>
    </section>
  );
};

export default Team;
