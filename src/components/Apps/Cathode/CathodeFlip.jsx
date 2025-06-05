import React from "react";

const Cathode = () => (
  <iframe
    src={`${process.env.PUBLIC_URL}/cathodeflip/index.html`}
    style={{ width: "100%", height: "100%", border: "none" }}
    title="CathodeFlip"
  />
);

export default Cathode;
