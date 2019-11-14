import React from "react";
import styles from "./Loader.module.css";



const Loading = () => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <div className={styles.text}>Loading...</div>
        <svg
          className={styles.circle}
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="155px"
          height="155px"
          viewBox="0 0 155 155"
          enable-background="new 0 0 155 155"
          xmlSpace="preserve"
        >
          <defs>
            <linearGradient
              id="loaderGradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="77.5"
              x2="155"
              y2="77.5"
            >
              <stop offset="0" style={{ stopColor: "#21E418" }}>
                <animate
                  attributeName="stop-color"
                  values="#21E418;#31B6E9;#21E418"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="1" style={{ stopColor: "#31B6E9" }}>
                <animate
                  attributeName="stop-color"
                  values="#31B6E9;#21E418;#31B6E9"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
          <circle
            fill="none"
            stroke="url(#loaderGradient)"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-dasharray="0.01, 15.2"
            cx="77.5"
            cy="77.5"
            r="75"
          >
            <animate
              attributeName="x"
              from="0"
              to="400px"
              dur="5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    </div>
  );
};

export default Loading;
