import { createStore, combineReducers } from "redux";
import { v1 as uuidv1 } from "uuid";

/*   EXPENSE REDUCERS    */

//ADD EXPENSE
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => {
  return {
    type: "ADD_EXPENSE",
    expense: {
      id: uuidv1(),
      description,
      note,
      amount,
      createdAt,
    },
  };
};

//REMOVE EXPENSE
const removeExpense = ({ id } = {}) => {
  return {
    type: "REMOVE_EXPENSE",
    id,
  };
};

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

//DEFAULT EXPENSE STATE
const expensesReducersDefaultState = [];

const expensesReducer = (state = expensesReducersDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter((expense) => {
        //if the expression returns true the item would be kept if not it would be removed
        return expense.id !== action.id;
      });
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

// SET_TEXT_FILTER
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text,
});

//SORT BY AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT",
});

//SORT BY DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE",
});

// SET_START_DATE
const setStartDate = (startDate) => ({
  type: "SET_START_DATE",
  startDate,
});

// SET_END_DATE
const setEndDate = (endDate) => ({
  type: "SET_END_DATE",
  endDate,
});

//Filter Reducer
const filtersReducerDefaultState = {
  text: "",
  sortBy: "amount",
  startDate: undefined,
  endDate: undefined,
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text,
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount",
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date",
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate,
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate,
      };
    default:
      return state;
  }
};

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter((expense) => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      }
      if (sortBy === "amount ") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

//store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

// //to watch for changes in the redux store
// store.subscribe(() => {
//   const state = store.getState();
//   const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
//   console.log(state.filters);
// });

const expenseOne = store.dispatch(
  addExpense({ description: "rent", amount: 100, createdAt: -21000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "orange", amount: 4000, createdAt: -1000 })
);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter("ddd"));
// store.dispatch(setTextFilter());
console.log(store.getState());

// store.dispatch(sortByAmount());

store.dispatch(sortByDate());

// store.dispatch(setStartDate(-2000));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));

const demoState = {
  expenses: [
    {
      id: "wsbwbenrn",
      description: "rent",
      note: "final rent payment",
      amount: 545,
      createdAt: 0,
    },
  ],
  filters: {
    text: "rent",
    sortBy: "date", //date or amount
    startDate: undefined,
    endDate: undefined,
  },
};
