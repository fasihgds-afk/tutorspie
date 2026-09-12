import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";

export function SummaryTable({ title, rows, editHref }) {
  const pairs = [];
  for (let i = 0; i < rows.length; ) {
    const row = rows[i];
    if (row.full) {
      pairs.push([row]);
      i += 1;
    } else if (i + 1 < rows.length && !rows[i + 1].full) {
      pairs.push([row, rows[i + 1]]);
      i += 2;
    } else {
      pairs.push([row]);
      i += 1;
    }
  }

  return (
    <section className="summary-table">
      <div className="summary-head">
        <h2>{title}</h2>
        {editHref ? (
          <Link to={editHref} className="edit-link">
            <Pencil size={14} /> Edit Order
          </Link>
        ) : null}
      </div>
      <table className="summary-data">
        <tbody>
          {pairs.map((pair, idx) => (
            <tr
              key={`${pair[0].label}-${idx}`}
              className={idx % 2 ? "alt" : ""}
            >
              {pair.map((cell) => (
                <td
                  key={cell.label}
                  colSpan={pair.length === 1 ? 2 : 1}
                  className={cell.full ? "full-cell" : ""}
                >
                  <b>{cell.label}</b>
                  {cell.full ? (
                    <div className="summary-scroll">{cell.value || "—"}</div>
                  ) : (
                    <span>{cell.value || "—"}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default SummaryTable;
