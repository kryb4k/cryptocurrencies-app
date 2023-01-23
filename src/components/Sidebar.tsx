import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sidebar.css";

interface Props {}

interface State {
  selectedCoin: string;
  popularCoins: Coin[];
  coinList: Array<{ name: string; id: string }>;
}

interface Coin {
  id: string;
  symbol: string;
  name: string;
}

const Sidebar: React.FC<Props> = () => {
  const [state, setState] = useState<State>({
    selectedCoin: "",
    popularCoins: [],
    coinList: [],
  });
  const [coinList, setCoinList] = useState<Array<{ name: string; id: string }>>(
    []
  );

  useEffect(() => {
    let data = localStorage.getItem("popularCoins");
    if (data) {
      setState({
        ...state,
        popularCoins: JSON.parse(data),
      });
    } else {
      const fetchData = async () => {
        try {
          const { data } = await axios.get<Coin[]>(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
          );
          setState({
            ...state,
            popularCoins: data,
          });
          localStorage.setItem("popularCoins", JSON.stringify(data));
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    const storedCoinList = localStorage.getItem("coinList");
    if (storedCoinList) {
      setCoinList(JSON.parse(storedCoinList));
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      selectedCoin: event.target.value,
    });
  };

  const handleAdd = () => {
    if (coinList.length < 5) {
      // Find the selected coin from the popularCoins array
      const selectedCoinData = state.popularCoins.find(
        (coin) => coin.name === state.selectedCoin
      );

      if (selectedCoinData) {
        // Create an object with the name and ID of the selected coin
        const selectedCoin = {
          name: selectedCoinData.name,
          id: selectedCoinData.id,
        };
        // Add the selected coin object to the coinList array
        const newCoinList = [...coinList, selectedCoin];
        setCoinList(newCoinList);
        localStorage.setItem("coinList", JSON.stringify(newCoinList));
      } else {
        console.log("Selected coin not found");
      }
    } else {
      console.log("You can only add 5 coins at a time.");
    }
  };

  // DOESN'T UPDATE THE UI
  const handleRemove = (coin: string) => {
    const newCoinList = state.coinList.filter((c) => c.name !== coin);
    setState({
      ...state,
      coinList: newCoinList,
    });
    const storedCoinList = JSON.parse(localStorage.getItem("coinList") || "[]");
    const updatedCoinList = storedCoinList.filter((c: string) => c !== coin);
    localStorage.setItem("coinList", JSON.stringify(updatedCoinList));
  };

  return (
    <div className="sidebar">
      <h2>Coins List</h2>

      {localStorage.getItem("popularCoins") ? (
        <div className="input-container">
          <select value={state.selectedCoin} onChange={handleChange}>
            {state.popularCoins.map((coin, index) => (
              <option key={index} value={coin.name}>
                {coin.name}
              </option>
            ))}
          </select>
          <button onClick={handleAdd} className="add-button">
            Add Coin
          </button>
        </div>
      ) : (
        <div className="input-container">
          <p className="error-message">Data is loading...</p>
        </div>
      )}
      <ul>
        {coinList.map((coin, index) => (
          <li key={index}>
            <div className="coin-name">{coin.name}</div>
            <button
              onClick={() => handleRemove(coin.name)}
              className="delete-button">
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
