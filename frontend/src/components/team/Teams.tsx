import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Teams = () => {
  const [teams, setTeams] = useState<any>();

  useEffect(() => {
    const fetchTeams = async (): Promise<any> => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/teams`
      );
      const json = await response.json();
      setTeams(json);
    };
    fetchTeams();
  }, []);
  console.log(teams);

  return <section className="d-flex justify-content-center">wip</section>;
};

export default Teams;
