import styles from "./sidebar.module.scss";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assests/Logo.svg";
import {
  discord,
  me,
  side1,
  side2,
  side3,
  side4,
  side5,
  side6,
  side7,
  side8,
  side9,
  twitter,
} from "../../assests/icon";

interface IProps {
  sidebarToggle: boolean;
}
const Sidebar = ({ sidebarToggle }: IProps) => {
  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.sidebarList}>
        <div className={`${styles.logo} ${styles.OnlyMobilelogo}`}>
          <Link to="/">
            <span>
              <img src={logo} alt="dummy" />
            </span>
          </Link>
        </div>
        <ul>
          <NavLink to="/dashboard">
            <li>
              {side1}
              Coinflip
            </li>
          </NavLink>

          <NavLink to="/service/category">
            <li>
              {side2}
              Crash
            </li>
          </NavLink>
          <NavLink to="/service">
            <li>
              {side3}
              Plinko
            </li>
          </NavLink>

          <NavLink to="/organization">
            <li>
              {side4}
              Dice
            </li>
          </NavLink>

          <NavLink to="/partners">
            <li>
              {side5}
              Lucky Wheel
            </li>
          </NavLink>

          <NavLink to="/">
            <li>
              {side6}
              Mines
            </li>
          </NavLink>

          <div className={styles.hrLine}></div>
          <NavLink to="/change">
            <li>
              {side7}
              Leaderboard
            </li>
          </NavLink>
          <NavLink to="/change-password">
            <li>
              {side8}
              Statistics
            </li>
          </NavLink>
          <NavLink to="/settings">
            <li>
              {side9}
              Settings
            </li>
          </NavLink>
        </ul>
      </div>
      <div className={styles.sidebarList}>
        <ul className={styles.ulBottom}>
          <li>{twitter}</li>
          <li>{discord}</li>
          <li>{me}</li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
