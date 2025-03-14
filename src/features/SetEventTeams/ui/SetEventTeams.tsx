import { useEffect, useState } from "react";
import { BracketTeam } from "@/entities/BracketTeam";
import { getEventTeams } from "../api/getEventTeams";
export default function SetEventTeams({ numTeams }: { numTeams: number }) {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    getEventTeams().then((data) => {
      setTeams(data);
    });
  }, []);
  return (
    <>
      {teams.map((t) => {
        return <BracketTeam key={t.id} team={t} />;
      })}
    </>
  );
}
