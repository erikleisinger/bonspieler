export default function BracketEditorOptions({
  teamCount,
  updateTeamCount,
  numWinners,
  updateNumWinners,
  renderBrackets,
  numBrackets,
  updateNumBrackets,
}) {
  return (
    <div>
      <div className="flex flex-col">
        <label htmlFor="TEAM_COUNT_INPUT">Team Count</label>
        <input
          className="text-black w-fit"
          type="number"
          id="TEAM_COUNT_INPUT"
          value={teamCount}
          onInput={updateTeamCount}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="BRACKET_COUNT_INPUT"># Brackets</label>
        <input
          className="text-black w-fit"
          type="number"
          id="BRACKET_COUNT_INPUT"
          value={numBrackets}
          onInput={updateNumBrackets}
        />
      </div>
      <div className="p-4">
        {new Array(numBrackets).fill(0).map((_, i) => (
          <div key={i}>
            <div className="flex flex-col">
              <label htmlFor={"WINNER_COUNT_INPUT" + "-" + i}>
                Winners bracket {i + 1}
              </label>
              <input
                className="text-black w-fit"
                type="number"
                id={"WINNER_COUNT_INPUT" + "-" + i}
                value={numWinners[i]}
                onInput={(val) => updateNumWinners(val, i)}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={renderBrackets}
        className="bg-slate-200 text-slate-900 rounded-md p-2"
      >
        render
      </button>
    </div>
  );
}
