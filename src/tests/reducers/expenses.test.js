import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expense if id not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "-1",
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should add an expense", () => {
  const action = {
    type: "ADD_EXPENSE",
    expense: {
      id: "222",
      description: "porn",
      note: "",
      amount: 100000,
      createdAt: "1000",
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, action.expense]);
});

test("should edit an expense", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[1].id,
    updates: {
      text: "for",
      amount: "200000",
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state[1]).toEqual({ ...expenses[1], ...action.updates });
});

test("should not edit an expense if the id is incorrect", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: "222",
    updates: {
      text: "for",
      amount: "200000",
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
