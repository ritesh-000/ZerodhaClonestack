
import React from "react";

function Signup() {

  const handleSignup = () => {
    // Later you can save user details here

    window.location.href = "http://localhost:3000";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Create Account</h1>

      <input
        type="text"
        placeholder="Name"
      /><br /><br />

      <input
        type="email"
        placeholder="Email"
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
      /><br /><br />

      <button onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
}

export default Signup;
// import React, { useState } from "react";
// import axios from "axios";

// function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:3002/signup", {
//         name,
//         email,
//         password,
//       });

//       alert(res.data.message);

//       // Redirect to dashboard
//       window.location.href = "http://localhost:3000";

//     } catch (err) {
//       alert(err.response?.data?.message || "Signup Failed");
//     }
//   };

//   return (
//     <div
//       style={{
//         textAlign: "center",
//         marginTop: "80px",
//         marginBottom: "80px",
//       }}
//     >
//       <h1>Create Account</h1>

//       <form onSubmit={handleSignup}>
//         <input
//           type="text"
//           placeholder="Enter Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           style={{
//             width: "300px",
//             padding: "10px",
//             margin: "10px",
//           }}
//         />

//         <br />

//         <input
//           type="email"
//           placeholder="Enter Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={{
//             width: "300px",
//             padding: "10px",
//             margin: "10px",
//           }}
//         />

//         <br />

//         <input
//           type="password"
//           placeholder="Enter Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={{
//             width: "300px",
//             padding: "10px",
//             margin: "10px",
//           }}
//         />

//         <br />

//         <button
//           type="submit"
//           style={{
//             padding: "10px 25px",
//             marginTop: "15px",
//             cursor: "pointer",
//           }}
//         >
//           Signup
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Signup;