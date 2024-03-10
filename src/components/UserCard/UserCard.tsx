import "./style.css";
import React from "react";
import {User} from "../SearchResults/SearchContext.ts";

export const UserCard: React.FC<User> = (props : User) => {
  return (
    <div className="userCard">
      <img className="userPic" src={props.image} />
      <div className="userInfo">
        <div>{`${props.firstName} ${props.lastName}`}</div>
        <div>{props.address.city}</div>
      </div>
    </div>
  );
}
