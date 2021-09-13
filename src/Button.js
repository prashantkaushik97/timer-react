import React from "react";

function Button({ name, type, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {name}
    </button>
  );
}

export default Button;
