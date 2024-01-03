import { Col, Row } from "react-bootstrap";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import styles from "./dashboard.module.scss";
import { ToastContainer } from "react-toastify";
import { sound } from "../../assests/icon";
import { useEffect, useRef, useState } from "react";
import Lists from "../../components/lists";
import { money } from "../../assests/icon";
import icons1 from "../../assests/Coin2.svg";
import TableCard from "../../components/table";
import Count from "../../components/count";
import SliderCard from "../../components/slider";
import { totalBets, totalBetsCard1, totalBetsCard2 } from "./dummyData";

// Define the structure of individual bets
interface Bet {
  icon: string;
  winMultiplier: string;
  amount: number;
}

function Dashboard() {
  const [timer, setTimer] = useState<any>(5);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [scrollBackground, setScrollBackground] = useState(false);

  const prevRollsContainerRef = useRef<HTMLDivElement | null>(null);

  // Animated bets for different sections
  const [animatedBets, setAnimatedBets] = useState<any>([]);
  const [animatedBetsCard, setAnimatedBetsCard] = useState<any>([]);
  const [animatedBetsTotal, setAnimatedBetsTotal] = useState<any>([]);

  // Refs to track mounting state for each section
  const isMounted = useRef(false);
  const isMountedCard = useRef(false);
  const isMountedCardTotal = useRef(false);

  // useEffect to animatedBetsTotal total bets
  useEffect(() => {
    const delay = 1200; // Set a larger delay time (in milliseconds)

    const sortedBets = totalBets.sort((a: Bet, b: Bet) => b.amount - a.amount);

    const animatedBetsTotal = async () => {
      for (let i = 0; i < sortedBets.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        setAnimatedBetsTotal((prevBets: Bet[]) => [...prevBets, sortedBets[i]]);
      }
    };

    if (isMountedCardTotal.current) {
      // Only run the effect after the initial render
      animatedBetsTotal();
    } else {
      isMountedCardTotal.current = true;
    }
  }, []);

  // useEffect to animateBets  bets
  useEffect(() => {
    const delay = 1200; // Set a larger delay time (in milliseconds)

    const sortedBets = totalBetsCard2.sort(
      (a: Bet, b: Bet) => b.amount - a.amount
    );

    const animateBets = async () => {
      for (let i = 0; i < sortedBets.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        setAnimatedBets((prevBets: Bet[]) => [...prevBets, sortedBets[i]]);
      }
    };

    if (isMounted.current) {
      // Only run the effect after the initial render
      animateBets();
    } else {
      isMounted.current = true;
    }
  }, []);

  // useEffect to animatedBetsCard  bets
  useEffect(() => {
    const delay = 1200; // Set a larger delay time (in milliseconds)

    const sortedBets = totalBetsCard1.sort(
      (a: Bet, b: Bet) => b.amount - a.amount
    );

    const animatedBetsCard = async () => {
      for (let i = 0; i < sortedBets.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        setAnimatedBetsCard((prevBets: Bet[]) => [...prevBets, sortedBets[i]]);
      }
    };

    if (isMountedCard.current) {
      // Only run the effect after the initial render
      animatedBetsCard();
    } else {
      isMountedCard.current = true;
    }
  }, []);

  // bet total amount function
  function calculateTotalAmount(bets: Bet[]): number {
    return bets.reduce((total: number, bet: Bet) => total + bet.amount, 0);
  }

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
            {scrollBackground ? (
              // Add a line when scrollBackground is true
              <div className={styles.line}></div>
            ) : null}
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
        <div>
          {/* <Lists /> */}

          <Row>
            <Col md={4} sm={12}>
              <div className={styles.placeBet}>
                <div className={styles.placeLeft}>
                  <img src={icons1} alt="" />
                  <h4>Place Bet</h4>
                </div>
                <div className={styles.placeRight}>
                  <h6>Win 2x</h6>
                </div>
              </div>

              <div className={styles.totalBet}>
                <div className={styles.totalMain}>
                  <div className={styles.totalLeft}>
                    <h5>{animatedBetsTotal.length} Bets Total</h5>
                  </div>
                  <div className={styles.totalRight}>
                    {money}
                    <h4>{calculateTotalAmount(animatedBetsTotal)}</h4>
                  </div>
                </div>
                <ul>
                  {animatedBetsTotal.map((bet: any, index: number) => (
                    <li key={`c-${index}`}>
                      <div className={styles.TotlaBet}>
                        <div className={styles.placeLeft}>
                          {bet.icon}
                          <h4>Place Bet</h4>
                        </div>
                        <div className={styles.placeRight}>
                          <h6>{` ${bet.winMultiplier}`}</h6>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col md={4} sm={12}>
              <div className={styles.placeBet}>
                <div className={styles.placeLeft}>
                  <img src={icons1} alt="" />
                  <h4>Place Bet</h4>
                </div>
                <div className={styles.placeRight}>
                  <h6>Win 2x</h6>
                </div>
              </div>

              <div className={styles.totalBet}>
                <div className={styles.totalMain}>
                  <div className={styles.totalLeft}>
                    <h5>{animatedBetsCard.length} Bets Total</h5>
                  </div>
                  <div className={styles.totalRight}>
                    {money}
                    <h4>{calculateTotalAmount(animatedBetsCard)}</h4>
                  </div>
                </div>
                <ul>
                  {animatedBetsCard.map((bet: any, index: number) => (
                    <li key={`b-${index}`}>
                      <div className={styles.TotlaBet}>
                        <div className={styles.placeLeft}>
                          {bet.icon}
                          <h4>Place Bet</h4>
                        </div>
                        <div className={styles.placeRight}>
                          <h6>{` ${bet.winMultiplier}`}</h6>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col md={4} sm={12}>
              <div className={styles.placeBet}>
                <div className={styles.placeLeft}>
                  <img src={icons1} alt="" />
                  <h4>Place Bet</h4>
                </div>
                <div className={styles.placeRight}>
                  <h6>Win 2x</h6>
                </div>
              </div>

              <div className={styles.totalBet}>
                <div className={styles.totalMain}>
                  <div className={styles.totalLeft}>
                    <h5>{animatedBets.length} Bets Total</h5>
                  </div>
                  <div className={styles.totalRight}>
                    {money}
                    <h4>{calculateTotalAmount(animatedBets)}</h4>
                  </div>
                </div>
                <ul>
                  {animatedBets.map((bet: any, index: number) => (
                    <li key={`a-${index}`}>
                      <div className={styles.TotlaBet}>
                        <div className={styles.placeLeft}>
                          {bet.icon}
                          <h4>Place Bet</h4>
                        </div>
                        <div className={styles.placeRight}>
                          <h6>{` ${bet.winMultiplier}`}</h6>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </div>
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
