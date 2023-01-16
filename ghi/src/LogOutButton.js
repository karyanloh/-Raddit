import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "./utils";

function LogOutButton() {
  const navigate = useNavigate();
  const [token, logout] = useToken();

  return (
    <div className="buttons">
      <button
        onClick={() => {
          logout();
        }}
        className="button is-light"
      >
        Log out
      </button>
    </div>
  );
}

export default LogOutButton;
