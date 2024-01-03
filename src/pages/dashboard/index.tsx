import { Col, Row, Table } from "react-bootstrap";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import styles from "./dashboard.module.scss";
import { ToastContainer } from "react-toastify";
import { money, sound } from "../../assests/icon";
import icons from "../../assests/Coin1.svg";
import icons1 from "../../assests/Coin2.svg";
import {
  tableDummyData,
  totalBets,
  totalBetsCard1,
  totalBetsCard2,
} from "./dummyData";
import { useEffect, useRef, useState } from "react";

interface Bet {
  icon: string;
  winMultiplier: string;
  amount: number;
}

interface TableRow {
  game: string;
  time: string;
  betAmount: string;
  multiplier: string;
  payout: string;
}

function Dashboard() {
  const [betAmount, setBetAmount] = useState(0);
  const [timer, setTimer] = useState<any>(14);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [scrollBackground, setScrollBackground] = useState(false);

  const [animatedBets, setAnimatedBets] = useState<any>([]);
  const [animatedBetsCard, setAnimatedBetsCard] = useState<any>([]);
  const [animatedBetsTotal, setAnimatedBetsTotal] = useState<any>([]);
  const prevRollsContainerRef = useRef<HTMLDivElement | null>(null);
  // Use the table dummy data from the imported file
  const tableData: TableRow[] = tableDummyData;

  const isMounted = useRef(false);
  const isMountedCard = useRef(false);
  const isMountedCardTotal = useRef(false);

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
                  setTimer(14);
                  setElapsedTime(0);
                }, 10000);
              }, 5000);
            }, 2000); // Adjust the delay time as needed
          } else {
            return 0;
          }
        } else {
          return prevTimer !== undefined ? prevTimer - 0.1 : 14;
        }
      });
    }, 100);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [elapsedTime]);

  const handleButtonClick = (value: any) => {
    console.log("value, value", value);
    // Handle button click and update bet amount
    switch (value) {
      case "Clear":
        setBetAmount(0);
        break;
      case "1/2":
        setBetAmount(betAmount / 2);
        break;
      case "X2":
        setBetAmount(betAmount * 2);
        break;
      case "MAX":
        // Set the maximum bet amount (you may replace this with your logic)
        setBetAmount(100); // Example: Setting the maximum bet amount to 100
        break;
      default:
        setBetAmount((prevAmount) => prevAmount + parseFloat(value));
        break;
    }
  };

  const handleInputChange = (event: any) => {
    console.log("event", event);
    // Handle manual input change
    const inputValue = parseFloat(event.target.value);
    if (!isNaN(inputValue)) {
      setBetAmount(inputValue);
    }
  };

  function calculateTotalAmount(bets: Bet[]): number {
    return bets.reduce((total: number, bet: Bet) => total + bet.amount, 0);
  }
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
              {/* <h2>ROLLING</h2>
              <h6>{timer.toFixed(2)}</h6> */}
            </div>
          </div>

          {/* Rolling Section End Here  */}

          {/* Previous  Rolling Section Start Here  */}

          <div className={styles.prevRoll}>
            <div className={styles.prevMain}>
              <div className={`${styles.prevLeft} `}>
                <h3>Previous rolls</h3>
                <div
                  className={`${styles.iconsMain} ${styles.prevRollsContainer}`}
                  ref={prevRollsContainerRef}
                >
                  <div className={styles.icons}>
                    <img src={icons} alt="coins" />
                  </div>
                  <div className={styles.icons}>
                    <img src={icons} alt="coins" />
                  </div>
                  <div className={styles.icons}>
                    <img src={icons1} alt="coins" />
                  </div>
                  <div className={styles.icons}>
                    <img src={icons1} alt="coins" />
                  </div>
                  <div className={styles.icons}>
                    <img src={icons1} alt="coins" />
                  </div>
                  <div className={styles.icons}>
                    <img src={icons1} alt="coins" />
                  </div>
                  <div className={styles.icons}>
                    <img src={icons} alt="coins" />
                  </div>
                </div>
              </div>

              <div className={`${styles.prevLeft} ${styles.prevRight}`}>
                <h3>Last 100</h3>
                <div className={styles.iconsMain}>
                  <div className={styles.icons}>
                    <img src={icons} alt="coins" />

                    <label>40</label>
                  </div>
                  <div className={styles.icons}>
                    <img src={icons} alt="coins" />
                    <label>40</label>
                  </div>
                  <div className={styles.icons}>
                    {" "}
                    <img src={icons1} alt="coins" />
                    <label>40</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Previous  Rolling Section End Here  */}

          {/* Bet Amount Section Start Here  */}

          <div className={styles.betAmount}>
            <div className={styles.amountBtns}>
              {money}
              <input
                type="text"
                placeholder="Enter bet amount..."
                onChange={handleInputChange}
                value={betAmount}
              />
              <div className={styles.buttons}>
                {[
                  "Clear",
                  "+0.01",
                  "+0.1",
                  "+1",
                  "+10",
                  "+100",
                  "1/2",
                  "X2",
                  "MAX",
                ].map((button) => (
                  <button
                    key={button}
                    type="button"
                    onClick={() => handleButtonClick(button)}
                  >
                    {button}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bet Amount Section End Here  */}
        </Row>

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
                  <h5>{totalBets.length} Bets Total</h5>
                </div>
                <div className={styles.totalRight}>
                  {money}
                  <h4>{calculateTotalAmount(totalBets)}</h4>
                </div>
              </div>
              <ul>
                {animatedBetsTotal.map((bet: any, index: number) => (
                  <li key={index}>
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
                  <h5>{totalBetsCard1.length} Bets Total</h5>
                </div>
                <div className={styles.totalRight}>
                  {money}
                  <h4>{calculateTotalAmount(totalBetsCard1)}</h4>
                </div>
              </div>
              <ul>
                {animatedBetsCard.map((bet: any, index: number) => (
                  <>
                    <li key={index}>
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
                  </>
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
                  <h5>{totalBetsCard2.length} Bets Total</h5>
                </div>
                <div className={styles.totalRight}>
                  {money}
                  <h4>{calculateTotalAmount(totalBetsCard2)}</h4>
                </div>
              </div>
              <ul>
                {animatedBets.map((bet: any, index: number) => (
                  <li key={index}>
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

      <div className={styles.dash_page}>
        <Row className="g-xl-4 g-3">
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

          {/* Table  Section End Here  */}
        </Row>
      </div>
    </DashboardLayout>
  );
}
export default Dashboard;
