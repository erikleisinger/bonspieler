"use client";
import Link from "next/link";
import { TournamentListItem } from "@/entities/Tournament";
import { useGetTournamentsQuery } from "@/shared/api";
import LoaderFullPage from "@/shared/ui/loader-full-page";
import { useRouter } from "next/navigation";
export default function TournamentList() {
  const { data: tournaments = [], isFetching } = useGetTournamentsQuery(null, {
    refetchOnMountOrArgChange: false,
  });

  const router = useRouter();

  function goToTournament(id: string) {
    router.push("/tournaments/" + id + "/edit");
  }

  return (
    <div className="absolute inset-0">
      {isFetching ? (
        <LoaderFullPage />
      ) : (
        <div className="absolute inset-0 overflow-auto">
          {tournaments.map((t) => (
            <div
              className="cursor-pointer"
              key={t.id}
              onClick={() => goToTournament(t.id)}
            >
              <TournamentListItem tournament={t} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
