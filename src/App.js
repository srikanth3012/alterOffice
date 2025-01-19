import "./App.scss";
import Layout from "./Layout";
import store from "./Redux/Store";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="app">
      <div className="wrapper">
        <Provider store={store}>
          <Layout />
        </Provider>
      </div>
    </div>
  );
}

export default App;
