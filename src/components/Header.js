import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Expensify</h1>
      <NavLink to="/" activeClassName="is-active" exact={true}>
        Dashbord
      </NavLink>
      <NavLink to="/create" activeClassName="is-active">
        Create_Expense
      </NavLink>

      <NavLink to="/help" activeClassName="is-active">
        Help
      </NavLink>
    </header>
  );
};

export default Header;
