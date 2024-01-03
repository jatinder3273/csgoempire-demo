import { Col, Row } from "react-bootstrap";
import styles from "../../pages/dashboard/dashboard.module.scss";
import { money } from "../../assests/icon";
import icons1 from "../../assests/Coin2.svg";

import {
  totalBets,
  totalBetsCard1,
  totalBetsCard2,
} from "../../pages/dashboard/dummyData";
import { useEffect, useRef, useState } from "react";

// Define the structure of individual bets
interface Bet {
  icon: string;
  winMultiplier: string;
  amount: number;
}

function Lists() {
  // Animated bets for different sections
  const [animatedBets, setAnimatedBets] = useState<any>([]);
  const [animatedBetsCard, setAnimatedBetsCard] = useState<any>([]);
  const [animatedBetsTotal, setAnimatedBetsTotal] = useState<any>([]);

  // Refs to track mounting state for each section
  const isMounted = useRef(false);
  const isMountedCard = useRef(false);
  const isMountedCardTotal = useRef(false);

  console.log("data", animatedBets, animatedBetsCard, animatedBetsTotal);

  // useEffect to animatedBetsTotal total bets
  useEffect(() => {
    const delay = 1200; // Set a larger delay time (in milliseconds)

    const sortedBet = totalBets.sort((a: Bet, b: Bet) => b.amount - a.amount);

    const animatedBetsTotal = async () => {
      for (let i = 0; i < sortedBet.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        setAnimatedBetsTotal((prevBets: Bet[]) => [...prevBets, sortedBet[i]]);
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

    const sortedBete = totalBetsCard1.sort(
      (a: Bet, b: Bet) => b.amount - a.amount
    );

    const animatedBetsCard = async () => {
      for (let i = 0; i < sortedBete.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        setAnimatedBetsCard((prevBets: Bet[]) => [...prevBets, sortedBete[i]]);
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

  return (
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
  );
}
export default Lists;
