import React, { useState } from 'react';
import styles from './style.module.css';
import './styles.css';

function DayNightToggle({ children }) {
  const [backGround, setBackGround] = useState(styles.day);
  const [checked, setChecked] = useState(false);

  function toggleHandler() {
    setChecked(!checked);
    setBackGround(backGround === styles.day ? styles.night : styles.day);
  }
  return (
    <>
      <div className={backGround}>
        <label htmlFor="toggle" onClick={toggleHandler}>
          <input checked={checked} type="checkbox" />
          <svg viewBox="0 0 100 45" width="100" height="45">
            <defs>
              <rect id="background" x="0" y="0" width="90" height="40" rx="20" />

              <clipPath id="clip">
                <use href="#background" />
              </clipPath>

              <linearGradient id="gradient-light" x1="0" x2="0" y1="0" y2="1">
                <stop stopColor="#ff47a1" offset="0" />
                <stop stopColor="#ff9f4d" offset="1" />
              </linearGradient>

              <filter id="blur-light">
                <feGaussianBlur stdDeviation="1" />
              </filter>

              <linearGradient id="gradient-dark" x1="0" x2="0" y1="0" y2="1">
                <stop stopColor="#1F2241" offset="0" />
                <stop stopColor="#7D59DF" offset="1" />
              </linearGradient>

              <linearGradient id="gradient-mask" x1="0" x2="0" y1="0" y2="1">
                <stop stopColor="#000" offset="0" />
                <stop stopColor="#fff" offset="1" />
              </linearGradient>

              <mask id="mask-dark">
                <use fill="url(#gradient-mask)" href="#background" />
              </mask>

              <radialGradient id="gradient-moon">
                <stop stopColor="#fdfdfd" offset="0.7" />
                <stop stopColor="#e2e2e2" offset="1" />
              </radialGradient>

              <radialGradient id="gradient-crater">
                <stop stopColor="#e0e0e0" offset="0" />
                <stop stopColor="#d9d9d9" offset="1" />
              </radialGradient>

              <pattern id="pattern-dark" width="0.2" height="1" viewBox="0 0 20 45">
                <path fill="#fff" d="M 2 5 l 1 1 l -1 1 l -1 -1 l 1 -1" />
                <path fill="#fff" d="M 10 16 l 1 1 l -1 1 l -1 -1 l 1 -1" />
                <path fill="#fff" d="M 16 27 l 1 1 l -1 1 l -1 -1 l 1 -1" />
                <path fill="#fff" d="M 10 38 l 1 1 l -1 1 l -1 -1 l 1 -1" />
              </pattern>
            </defs>
            <g transform="translate(5 2.5)">
              <g clipPath="url(#clip)">
                <g className="dark">
                  <use fill="url(#gradient-dark)" href="#background" />
                  <g className="background" transform="translate(0 -40) scale(1 0.4)">
                    <rect
                      transform="translate(-40 0) rotate(4)"
                      fill="url(#pattern-dark)"
                      x="0"
                      y="0"
                      width="100"
                      height="45"
                    />
                  </g>
                  <use mask="url(#mask-dark)" fill="url(#gradient-dark)" href="#background" />
                </g>
                <g className="light">
                  <use fill="url(#gradient-light)" href="#background" />
                  <g className="background" transform="translate(-30 -20)">
                    <g transform="translate(30 20)">
                      <rect fill="url(#pattern-light)" x="-5" y="27.5" width="100" height="45" />
                    </g>
                  </g>
                </g>
              </g>
            </g>

            <g transform="translate(77.5 22.5)">
              <g className="translate" transform="translate(-55)">
                <g className="rotate" transform="rotate(-100)">
                  <g className="dark">
                    <circle fill="url(#gradient-moon)" cx="0" cy="0" r="20.5" />
                    <g transform="translate(-8 -7.5)">
                      <ellipse
                        transform="rotate(-30)"
                        fill="url(#gradient-crater)"
                        stroke="#d5d5d5"
                        strokeWidth="0.2"
                        cx="0"
                        cy="0"
                        rx="4"
                        ry="3"
                      />
                    </g>
                    <g transform="translate(11 5)">
                      <ellipse
                        fill="url(#gradient-crater)"
                        stroke="#d5d5d5"
                        strokeWidth="0.2"
                        cx="0"
                        cy="0"
                        rx="3.85"
                        ry="4"
                      />
                    </g>
                    <g transform="translate(-6 12)">
                      <ellipse
                        transform="rotate(-10)"
                        fill="url(#gradient-crater)"
                        stroke="#d5d5d5"
                        strokeWidth="0.2"
                        cx="0"
                        cy="0"
                        rx="2"
                        ry="1.75"
                      />
                    </g>
                  </g>
                </g>
                <g className="light">
                  <circle fill="#FFD21F" cx="0" cy="0" r="21" filter="url(#blur-light)" />
                  <circle fill="#FFD21F" cx="0" cy="0" r="20.5" />
                </g>
              </g>
            </g>
          </svg>
        </label>
        {children}
      </div>
    </>
  );
}

export default DayNightToggle;
