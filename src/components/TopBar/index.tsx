import profileImg from "../../assests/user.svg";
import styles from "./topBar.module.scss";
import logo from "../../assests/Logo.svg";
import { Link } from "react-router-dom";
import {
  message,
  notification,
  salongLogo,
  save,
  search,
} from "../../assests/icon";
import Select from "react-select";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

interface IProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}
const TopBar = ({ toggleSidebar, sidebarOpen }: IProps) => {
  const options = [
    { value: "option1", label: "49.55677717" },
    { value: "option2", label: "88.55677717" },
    { value: "option3", label: "69.55677717" },
  ];
  const handleChange = (selectedOption: any) => {
    console.log(`Selected Option: ${selectedOption.label}`);
  };

  return (
    <div className={styles.topBar}>
      <div className={styles.topBar_search}>
        <div className={styles.logo}>
          <Link to="/">
            <span>
              <img src={logo} alt="dummy" />
            </span>
          </Link>
        </div>
        <button onClick={toggleSidebar} className={styles.buttonsLine}>
          {sidebarOpen ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
        </button>
      </div>

      <div className={styles.selectUsers}>
        <div className={styles.selectBox}>
          <span className={styles.logoss}>{salongLogo}</span>
          <Select
            options={options}
            onChange={handleChange}
            classNamePrefix="selectBox"
          />

          <span className={styles.logoss}>{save}</span>
        </div>
      </div>

      <div className={styles.login_user}>
        <div className={styles.searchImg}>
          <span>{search}</span>
          <span>{notification}</span>
          <span>{message}</span>
        </div>
        <button>
          <div>
            <span>Peter Penn</span>
            <img src={profileImg} alt="profile img" />
          </div>
        </button>
      </div>
    </div>
  );
};
export default TopBar;
