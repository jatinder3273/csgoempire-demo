import styles from "../../pages/dashboard/dashboard.module.scss";
import icons from "../../assests/Coin1.svg";
import icons1 from "../../assests/Coin2.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";

function SliderCard() {
  const prevRollsContainerRef = useRef<HTMLDivElement | null>(null);

  const iconArray = [
    icons,
    icons,
    icons1,
    icons1,
    icons,
    icons,
    icons,
    icons,
    icons1,
    icons1,
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true, // Enable auto-scrolling
    autoplaySpeed: 2000,
  };

  return (
    <>
      {/* Previous  Rolling Section Start Here  */}
      <div className={styles.prevRoll}>
        <div className={styles.prevMain}>
          <div className={`${styles.prevLeft} `}>
            <h3>Previous rolls</h3>
            <div
              className={`${styles.iconsMain} ${styles.prevRollsContainer}`}
              ref={prevRollsContainerRef}
            >
              <div className={styles.iconsContainer}>
                <Slider {...settings} className={styles.slick_slider}>
                  {iconArray.map((iconSrc, index) => (
                    <div key={index} className={styles.icons}>
                      <img src={iconSrc} alt="coins" />
                    </div>
                  ))}
                </Slider>
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
                <img src={icons1} alt="coins" />
                <label>40</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SliderCard;
