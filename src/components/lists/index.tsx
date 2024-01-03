import { Col, Row } from "react-bootstrap";
import styles from "../../pages/dashboard/dashboard.module.scss";
import { money } from "../../assests/icon";
import icons1 from "../../assests/Coin2.svg";

import {
  totalBets,
  totalBetsCard1,
  totalBetsCard2,
} from "../../pages/dashboard/dummyData";
import { useEffect, useState } from "react";

// Define the structure of individual bets
interface Bet {
  icon: string;
  winMultiplier: string;
  amount: number;
}

function Lists({ scrollBackground }: { scrollBackground: boolean }) {
  // Animated bets for different sections
  const [animatedBets, setAnimatedBets] = useState<any>([]);
  const [animatedBetsCard, setAnimatedBetsCard] = useState<any>([]);
  const [animatedBetsTotal, setAnimatedBetsTotal] = useState<any>([]);

  // useEffect to animatedBetsTotal total bets
  useEffect(() => {
    const delay = 1200; // Set a larger delay time (in milliseconds)

    const sortedBet = totalBets.sort((a: Bet, b: Bet) => b.amount - a.amount);

    const animatedBetsTotalFun = async () => {
      for (const element of sortedBet) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        setAnimatedBetsTotal((prevBets: Bet[]) => [...prevBets, element]);
      }
    };
    if (scrollBackground) {
      setAnimatedBetsTotal([]);
    } else {
      animatedBetsTotalFun();
    }
  }, [scrollBackground]);

  // useEffect to animateBets  bets
  useEffect(() => {
    const delay = 1200; // Set a larger delay time (in milliseconds)

    const sortedBets = totalBetsCard2.sort(
      (a: Bet, b: Bet) => b.amount - a.amount
    );

    const animateBetsFun = async () => {
      for (const element of sortedBets) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        setAnimatedBets((prevBets: Bet[]) => [...prevBets, element]);
      }
    };
    if (scrollBackground) {
      setAnimatedBets([]);
    } else {
      animateBetsFun();
    }
  }, [scrollBackground]);

  // useEffect to animatedBetsCard  bets
  useEffect(() => {
    const delay = 1200; // Set a larger delay time (in milliseconds)

    const sortedBete = totalBetsCard1.sort(
      (a: Bet, b: Bet) => b.amount - a.amount
    );

    const animatedBetsCardFun = async () => {
      for (const element of sortedBete) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        setAnimatedBetsCard((prevBets: Bet[]) => [...prevBets, element]);
      }
    };
    if (scrollBackground) {
      setAnimatedBetsCard([]);
    } else {
      animatedBetsCardFun();
    }
  }, [scrollBackground]);

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
