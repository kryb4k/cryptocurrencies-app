import "./App.css";
import Sidebar from "./components/Sidebar";
// import CoinChart from "/components/CoinChart";

function App() {
  return (
    <div className="App">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">{/* <CoinChart /> */}</div>
    </div>
  );
}

export default App;
