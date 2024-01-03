import { Table } from "react-bootstrap";
import styles from "../../pages/dashboard/dashboard.module.scss";
import { tableDummyData } from "../../pages/dashboard/dummyData";

// Define the structure of individual TableRow
interface TableRow {
  game: string;
  time: string;
  betAmount: string;
  multiplier: string;
  payout: string;
}

function TableCard() {
  // Use the table dummy data from the imported file
  const tableData: TableRow[] = tableDummyData;

  return (
    <div className={styles.dash_pages}>
      {/* Table Section Start Here  */}
      <div className={styles.heading}>
        <h1>Daily Roulette Race</h1>
        <p> Ends in 5h 23 min 11 sec</p>
      </div>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Game</th>
            <th>Time</th>
            <th>Bet Amount</th>
            <th>Multiplier</th>
            <th>Payout</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.game}</td>
              <td>{row.time}</td>
              <td>{row.betAmount}</td>
              <td>{row.multiplier}</td>
              <td style={{ color: index === 1 ? "#CD2A2A" : "#3BB369" }}>
                {row.payout}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default TableCard;
