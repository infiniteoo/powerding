import React from "react";
import AddSoundForm from "./addsound.js";

const admin = () => {
  return (
    <div width="100%">
      <div className="adminSplash">
        <h1>ADMIN PAGE</h1>

        <AddSoundForm />
      </div>
    </div>
  );
};

export default admin;
