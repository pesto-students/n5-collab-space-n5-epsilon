import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
const loggerMiddleware = createLogger();
const middleWare = applyMiddleware(thunkMiddleware, loggerMiddleware);
// create a makeStore function

function configureStore() {
  return createStore(rootReducer, composeWithDevTools(middleWare));
}

const makeStore = (context) => configureStore();

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
