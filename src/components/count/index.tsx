import styles from "../../pages/dashboard/dashboard.module.scss";
import { money } from "../../assests/icon";

import { useState } from "react";

function Count() {
  const [betAmount, setBetAmount] = useState(0);

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

  // handle input change method
  const handleInputChange = (event: any) => {
    console.log("event", event);
    // Handle manual input change
    const inputValue = parseFloat(event.target.value);
    if (!isNaN(inputValue)) {
      setBetAmount(inputValue);
    }
  };

  return (
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
  );
}
export default Count;
