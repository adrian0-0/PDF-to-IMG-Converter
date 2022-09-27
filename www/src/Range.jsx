import React, { useState } from "react";
import RangeSlider from "react-bootstrap-range-slider";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import "./styl/range.styl";

const Range = () => {
  const [value, setValue] = React.useState(300);

  return (
    <div className="range">
      <p>DPI Recomendado: 300</p>
      <RangeSlider
        value={value}
        onChange={(e) => setValue(e.target.value)}
        step={50}
        min={200}
        max={500}
      />
    </div>
  );
};

export default Range;
