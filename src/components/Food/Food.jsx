import React from "react";
import PropTypes from "prop-types";

Food.propTypes = {
  dot: PropTypes.array.isRequired,
};

function Food(props) {
  const food = props;

  const style = {
    left: `${food.dot[0]}%`,
    top: `${food.dot[1]}%`,
  };
  return <div className="snake-food" style={style}></div>;
}

export default Food;
