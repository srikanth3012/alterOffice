import "./App.scss";
import store from "./Redux/Store";
import LogInPage from "./routes/LogIn/logInPage";

import TaskBudddy from "./routes/taskBuddy/taskBuddy";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="app">
      <div className="wrapper">
        <Provider store={store}>
          <TaskBudddy />
          {/* <LogInPage /> */}
        </Provider>
      </div>
    </div>
  );
}

export default App;
