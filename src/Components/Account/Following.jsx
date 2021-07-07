import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { FollFlrsCard } from "./FollFlrsCard";
import { toast } from "react-toastify";

import "./following.css";
import { useEffect } from "react";

export const Following = () => {
  useEffect(() => {
    toast("Loading!", {
      position: "top-right",
      autoClose: 2000,
    });
  }, []);
  const { username } = useParams();

  const user = useSelector((state) => state.users.users).find(
    (user) => user.username === username
  );

  return (
    <div>
      <p className="follflrs-tag">
        {user?.username} <span>Following</span>{" "}
      </p>
      {user?.following.map((item) => {
        return <FollFlrsCard userId={item} key={item} />;
      })}
    </div>
  );
};
