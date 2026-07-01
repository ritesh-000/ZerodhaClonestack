// import React from "react";

// import { positions } from "../data/data";


// const Positions = () => {
//   return (
//     <>
//       <h3 className="title">Positions ({positions.length})</h3>

//       <div className="order-table">
//         <table>
//           <tr>
//             <th>Product</th>
//             <th>Instrument</th>
//             <th>Qty.</th>
//             <th>Avg.</th>
//             <th>LTP</th>
//             <th>P&L</th>
//             <th>Chg.</th>
//           </tr>

//           {positions.map((stock, index) => {
//             const curValue = stock.price * stock.qty;
//             const isProfit = curValue - stock.avg * stock.qty >= 0.0;
//             const profClass = isProfit ? "profit" : "loss";
//             const dayClass = stock.isLoss ? "loss" : "profit";

//             return (
//               <tr key={index}>
//                 <td>{stock.product}</td>
//                 <td>{stock.name}</td>
//                 <td>{stock.qty}</td>
//                 <td>{stock.avg.toFixed(2)}</td>
//                 <td>{stock.price.toFixed(2)}</td>
//                 <td className={profClass}>
//                   {(curValue - stock.avg * stock.qty).toFixed(2)}
//                 </td>
//                 <td className={dayClass}>{stock.day}</td>
//               </tr>
//             );
//           })}
//         </table>
//       </div>
//     </>
//   );
// };

// export default Positions;
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Positions = () => {
//   const [positions, setPositions] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3002/allPositions")
//       .then((res) => {
//         setPositions(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <>
//       <h3 className="title">Positions ({positions.length})</h3>

//       <div className="order-table">
//         <table>
//           <thead>
//             <tr>
//               <th>Product</th>
//               <th>Instrument</th>
//               <th>Qty.</th>
//               <th>Avg.</th>
//               <th>LTP</th>
//               <th>P&L</th>
//               <th>Chg.</th>
//             </tr>
//           </thead>

//           <tbody>
//             {positions.map((stock, index) => {
//               const curValue = stock.price * stock.qty;
//               const isProfit =
//                 curValue - stock.avg * stock.qty >= 0;

//               const profClass = isProfit ? "profit" : "loss";
//               const dayClass = stock.isLoss ? "loss" : "profit";

//               return (
//                 <tr key={index}>
//                   <td>{stock.product}</td>
//                   <td>{stock.name}</td>
//                   <td>{stock.qty}</td>
//                   <td>{stock.avg.toFixed(2)}</td>
//                   <td>{stock.price.toFixed(2)}</td>

//                   <td className={profClass}>
//                     {(curValue - stock.avg * stock.qty).toFixed(2)}
//                   </td>

//                   <td className={dayClass}>{stock.day}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default Positions;
import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3002/allPositions"
        );

        const updatedPositions = await Promise.all(
          res.data.map(async (stock) => {
            try {
              const priceRes = await axios.get(
                `http://localhost:3002/price/${stock.name}`
              );

              return {
                ...stock,
                price: priceRes.data.price,
                day:
                  (priceRes.data.changePercent >= 0 ? "+" : "") +
                  priceRes.data.changePercent.toFixed(2) +
                  "%",
                isLoss: priceRes.data.change < 0,
              };
            } catch {
              return stock;
            }
          })
        );

        setPositions(updatedPositions);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPositions();
  }, []);

  return (
    <>
      <h3 className="title">
        Positions ({positions.length})
      </h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>

          <tbody>
            {positions.map((stock, index) => {
              const curValue = stock.price * stock.qty;

              const pnl =
                curValue - stock.avg * stock.qty;

              return (
                <tr key={index}>
                  <td>{stock.product}</td>

                  <td>{stock.name}</td>

                  <td>{stock.qty}</td>

                  <td>{stock.avg.toFixed(2)}</td>

                  <td>{Number(stock.price).toFixed(2)}</td>

                  <td className={pnl >= 0 ? "profit" : "loss"}>
                    {pnl.toFixed(2)}
                  </td>

                  <td className={stock.isLoss ? "loss" : "profit"}>
                    {stock.day}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;