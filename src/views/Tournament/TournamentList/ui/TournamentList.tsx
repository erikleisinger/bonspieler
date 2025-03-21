import Link from "next/link";
import { useEffect, useState } from "react";
import { getTournaments } from "../api/getTournaments";
import { TournamentListItem } from "@/entities/Tournament";
import LoaderFullPage from "@/shared/ui/loader-full-page";
export default function TournamentList() {
  const [loading, setLoading] = useState(false);
  const [tournaments, setTournaments] = useState([]);
  useEffect(() => {
    setLoading(true);
    getTournaments().then((data) => {
      setTournaments(data);
      setLoading(false);
    });
  }, []);
  return loading ? (
    <LoaderFullPage />
  ) : (
    tournaments.map((t) => (
      <Link key={t.id} href={"tournaments/edit/" + t.id}>
        <TournamentListItem tournament={t} />
      </Link>
    ))
  );
}
