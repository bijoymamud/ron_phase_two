
import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <div className="buttons">
        <button className="btn">
          <span />
          <p>
            <span className="default-text">new game</span>
            <span className="hover-text">
              start! <span className="arrow">→</span>
            </span>
          </p>
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .buttons {
    display: flex;
    justify-content: space-around;
    top: 20px;
    left: 20px;
  }

  .buttons button {
    width: 150px;
    height: 50px;
    background-color: white;
    margin: 20px;
    color: #568fa6;
    position: relative;
    overflow: hidden;
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: uppercase;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
  }

  .buttons button:before,
  .buttons button:after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    background-color: #44d8a4;
    transition: all 0.3s cubic-bezier(0.35, 0.1, 0.25, 1);
  }

  .buttons button:before {
    right: 0;
    top: 0;
    transition: all 0.5s cubic-bezier(0.35, 0.1, 0.25, 1);
  }

  .buttons button:after {
    left: 0;
    bottom: 0;
  }

  .buttons button span {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
    z-index: 1;
  }

  .buttons button span:before,
  .buttons button span:after {
    content: "";
    position: absolute;
    width: 2px;
    height: 0;
    background-color: #44d8a4;
    transition: all 0.3s cubic-bezier(0.35, 0.1, 0.25, 1);
  }

  .buttons button span:before {
    right: 0;
    top: 0;
    transition: all 0.5s cubic-bezier(0.35, 0.1, 0.25, 1);
  }

  .buttons button span:after {
    left: 0;
    bottom: 0;
  }

  .buttons button p {
    padding: 0;
    margin: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    z-index: 2;
  }

  .buttons button p .default-text,
  .buttons button p .hover-text {
    position: absolute;
    transition: all 0.4s ease;
    white-space: nowrap;
  }

  .buttons button p .default-text {
    top: 50%;
    transform: translateY(-50%);
  }

  .buttons button p .hover-text {
    top: 150%;
    color: #44d8a4;
  }

  .buttons button:hover:before,
  .buttons button:hover:after {
    width: 100%;
  }

  .buttons button:hover span {
    z-index: 1;
  }

  .buttons button:hover span:before,
  .buttons button:hover span:after {
    height: 100%;
  }

  .buttons button:hover p .default-text {
    top: -50%;
    transform: rotate(5deg);
  }

  .buttons button:hover p .hover-text {
    top: 50%;
    transform: translateY(-50%);
  }

  .arrow {
    margin-left: 4px;
    font-weight: bold;
    font-size: 16px;
  }

  .buttons button:active {
    outline: none;
    border: none;
  }

  .buttons button:focus {
    outline: 0;
  }
`;

export default Button;
