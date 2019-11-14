import React from "react";
import { images } from "../../assets";

export const Spinner = () => {
  return (
    <div>
      <img
        src={images.spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};
