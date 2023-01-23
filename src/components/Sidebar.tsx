import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sidebar.css";

interface Props {}

interface State {
  selectedCoin: string;
  popularCoins: Coin[];
  coinList: string[];
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<Coin[]>(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
        );
        setState({
          ...state,
          popularCoins: data,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      selectedCoin: event.target.value,
    });
  };

  const handleAdd = () => {
    if (state.coinList.length < 5) {
      setState({
        ...state,
        coinList: [...state.coinList, state.selectedCoin],
      });
    } else {
      console.log("You can only add 5 coins at a time.");
    }
  };

  const handleRemove = (coin: string) => {
    setState({
      ...state,
      coinList: state.coinList.filter((c) => c !== coin),
    });
  };

  return (
    <div className="sidebar">
      <h2>Coins List</h2>
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
      <ul>
        {state.coinList.map((coin, index) => (
          <li key={index}>
            <div className="coin-name">{coin}</div>
            <button
              onClick={() => handleRemove(coin)}
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
