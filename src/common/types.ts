export interface CoinData {
  [coin: string]: {
    currentPrice: number;
    chartData: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
      }[];
    };
  };
}

export interface CoinSelectorProps {
  setCoins: (coins: string[]) => void;
}
