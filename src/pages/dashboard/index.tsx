import { Row } from "react-bootstrap";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import styles from "./dashboard.module.scss";
import { ToastContainer } from "react-toastify";
import { sound } from "../../assests/icon";
import { useEffect, useRef, useState } from "react";
import Lists from "../../components/lists";
import TableCard from "../../components/table";
import Count from "../../components/count";
import SliderCard from "../../components/slider";

function Dashboard() {
  const [timer, setTimer] = useState<any>(5);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [scrollBackground, setScrollBackground] = useState(false);

  const prevRollsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime((prevElapsedTime) =>
        prevElapsedTime ? prevElapsedTime + 80 : 80
      );

      setTimer((prevTimer: any) => {
        if (prevTimer !== undefined && prevTimer <= 0.9) {
          clearInterval(intervalId);

          if (elapsedTime >= 10000) {
            setScrollBackground(true);

            setTimeout(() => {
              setScrollBackground(false);

              // Scroll to the target section
              if (prevRollsContainerRef.current) {
                prevRollsContainerRef.current.scrollLeft = 0;
              }

              setTimeout(() => {
                // Remove the class and restart the timer after 2-3 seconds
                setScrollBackground(false);
                setTimeout(() => {
                  setTimer(5);
                  setElapsedTime(0);
                }, 10000);
              }, 5000);
            }, 2000); // Adjust the delay time as needed
          } else {
            return 0;
          }
        } else {
          return prevTimer !== undefined ? prevTimer - 0.01 : 5;
        }
      });
    }, 20);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [elapsedTime]);

  return (
    <DashboardLayout>
      <ToastContainer />
      <div className={styles.dash_page}>
        <Row className="g-xl-4 g-3">
          {/* Rolling Section Start Here  */}
          <div className={styles.heading}>
            <h1>Roulette</h1>
            <p> {sound} Sound On</p>
          </div>

          <div
            className={`${styles.RollingSection} ${
              scrollBackground ? styles.scrollBackground : ""
            }`}
          >
            <div className={styles.line}></div>
            <div className={styles.bgColor}></div>
            <div className={styles.rollingText}>
              {scrollBackground ? (
                ""
              ) : (
                <>
                  <h2>ROLLING</h2>
                  <h6>{timer.toFixed(2)}</h6>
                </>
              )}
            </div>
          </div>

          {/* Previous  Rolling Section Start Here  */}
          <SliderCard />

          {/* Bet Count Section Start Here  */}
          <Count />
        </Row>

        {/* List Amount Section Start Here  */}
        <Lists />
      </div>

      {/* Table  Section Start Here  */}
      <div className={styles.dash_page}>
        <Row className="g-xl-4 g-3">
          <TableCard />
        </Row>
      </div>
    </DashboardLayout>
  );
}
export default Dashboard;
