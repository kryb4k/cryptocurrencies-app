// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";

// const CoinChart: React.FC = () => {
//   const [chartData, setChartData] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch(
//         `https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=1577836800&to=1609459200`
//       );
//       const data = await res.json();
//       setChartData({
//         labels: data.prices.map((price: any) => price[0]),
//         datasets: [
//           {
//             label: "Coin Price",
//             data: data.prices.map((price: any) => price[1]),
//             backgroundColor: ["rgba(255, 99, 132, 0.6)"],
//             borderWidth: 2,
//             borderColor: "#777",
//             hoverBorderWidth: 3,
//             hoverBorderColor: "#000",
//           },
//         ],
//       });
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <Line
//         data={chartData}
//         options={{
//           title: {
//             display: true,
//             text: "Coin Price",
//             fontSize: 25,
//           },
//           legend: {
//             display: true,
//             position: "right",
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default CoinChart;
