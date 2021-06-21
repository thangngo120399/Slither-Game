import React from "react";
import PropTypes from "prop-types";
import Head from "./mattron.jpg";
Snake.propTypes = {
  snakeDots: PropTypes.array.isRequired,
};

function Snake(props) {
  const snakeDots = props.snakeDot;
  return (
    <div>
      {snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
        };

        return <div className="snake-dot" key={i} style={style}></div>;
      })}
    </div>
  );
}

export default Snake;
