import React from "react";
import ReactDOM from "react-dom";

import AppRouter from "./routers/AppRouter";

import configureStore from "./store/configureStore";

import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
import { Provider } from "react-redux";

const store = configureStore();
store.dispatch(addExpense({ description: "water bill", amount: 4500 }));
store.dispatch(addExpense({ description: "rent", amount: 109500 }));
store.dispatch(addExpense({ description: "gas bill", createdAt: 1000 }));
store.dispatch(addExpense({ description: "light", amount: 1000500 }));

const state = store.getState();

const getExpenses = getVisibleExpenses(state.expenses, state.filters);

// console.log(getExpenses);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const appRoot = document.getElementById("app");
ReactDOM.render(jsx, appRoot);
