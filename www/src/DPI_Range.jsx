import React, { useState } from "react";
import RangeSlider from "react-bootstrap-range-slider";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import "./styl/DPI_Range.styl";

function rangeValue() {
  // (e) => setValue(e.target.value)
  const rangeValue = document.querySelector(".range__slider").value;
  return rangeValue;
}

export { rangeValue };

const Range = () => {
  const [value, setValue] = React.useState(72);

  return (
    <div className="range">
      <p>DPI Recomendado: 72</p>
      <RangeSlider
        value={value}
        className="range__slider"
        onChange={(e) => setValue(e.target.value)}
        min={50}
        max={300}
      />
    </div>
  );
};

export default Range;
