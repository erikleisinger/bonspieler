import { format } from "date-fns";
export default function DrawTime({
  drawTime,
  ...props
}: {
  drawTime: Date | undefined;
}) {
  const formatted = !drawTime ? "" : format(drawTime, "h:mm aaa • MMM do");

  return <div {...props}>{formatted}</div>;
}
