type Props = {
  value: string | number;
  col: string;
};
{
  /* <span className="visible sm:invisible"> {col}:</span>; */
}
export function Cell({ value, col }: Readonly<Props>) {
  return (
    <td
      tabIndex={0}
      className="p-4 before:font-bold before:capitalize before:pr-2 truncate "
      data-cell={col}
    >
      {value}
    </td>
  );
}
