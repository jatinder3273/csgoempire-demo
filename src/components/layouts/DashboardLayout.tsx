import React, { useEffect, useState } from "react";
import styles from "../../styles/layouts/DashboardLayout.module.scss";
import Sidebar from "../sidebar";
import TopBar from "../TopBar";

interface IProps {
  children: React.ReactNode;
}
const DashboardLayout = ({ children }: IProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Use useEffect to update the screen width state
  useEffect(() => {
    if (window.innerWidth <= 767) {
      setSidebarOpen(true);
    }
  }, []);

  return (
    <div
      className={`${styles.DashboardLayout} ${
        sidebarOpen ? "sidebarClose" : ""
      }`}
    >
      <div className={styles.DashboardPage}>
        <div className={styles.DashboardBody}>
          <TopBar
            toggleSidebar={handleToggleSidebar}
            sidebarOpen={sidebarOpen}
          />
          <div className={styles.DashboardBody_content}>{children}</div>
        </div>

        <div
          className={`${styles.overlay} ${sidebarOpen ? styles.hide : ""} `}
          onClick={handleToggleSidebar}
        />
        <div className={styles.DashboardSidebar}>
          <Sidebar sidebarToggle={sidebarOpen} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
