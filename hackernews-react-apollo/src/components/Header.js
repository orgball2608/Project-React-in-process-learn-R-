import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants/auth.js";

const Header = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <div className="flex px-5 justify-between nowrap bg-orange-600">
      <div className="flex text-black gap-2 font-semibold py-2">
        <Link to="/" className=" text-black">
          <div className="text-xl font-bold">Hacker News</div>
        </Link>
        <Link to="/" className=" text-black">
          new
        </Link>
        <div>|</div>
        <Link to="/search" className=" text-black">
          search
        </Link>
        {authToken && (
          <div className="flex">
            <div className="ml-1">|</div>
            <Link to="/create" className="text-black ml-1">
              submit
            </Link>
          </div>
        )}
      </div>
      <div className="flex text-black gap-2 font-semibold py-2">
        {authToken ? (
          <div
            className=" cursor-pointer text-black"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              navigate(`/`);
            }}
          >
            logout
          </div>
        ) : (
          <Link to="/login" className=" text-black">
            login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
