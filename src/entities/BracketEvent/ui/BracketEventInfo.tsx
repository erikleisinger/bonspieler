export default function BracketEventInfo({
  numStartTeams,
  numDraws,
  numEndTeams,
}: {
  numStartTeams: number;
  numDraws: number;
  numEndTeams: number;
}) {
  return (
    <>
      <div className="flex justify-between">
        Teams <strong>{numStartTeams}</strong>
      </div>
      <div className="flex justify-between">
        Teams advancing <strong>{numEndTeams}</strong>
      </div>
      <div className="flex justify-between">
        Draws <strong>{numDraws}</strong>
      </div>
    </>
  );
}
