// import withSession from "../../sessionConfig";
// import client from "@/client/client";

// export default withSession(async (req: any, res: any) => {
//   const { email, password } = req.body;
//   const response = await client.post("/api/v2/auth/authenticate", {
//     email,
//     password,
//   });
//   if (response.data && response.data.token) {
//     req.session.set("user", { token: response.data.token });
//     await req.session.save();
//     res.status(200).json({ message: "Logged in" });
//   } else {

//     res.status(401).json({ message: "Invalid email or password" });
//   }
// });

// import withSession from "../../sessionConfig";
// import client from "@/client/client";

// export default withSession(async (req: any, res: any) => {
//   const { email, password } = req.body;

//   try {
//     const response = await client.post("/api/v2/auth/authenticate", {
//       email,
//       password,
//     });

//     console.log("respooooooooooonse: ", response);
//     console.log("reponnnse data: ", response?.data);
//     // Check if response is successful and contains a token
//     if (response.status === 200 && response.data && response.data.token) {
//       console.log("loooooooooogin right");
//       req.session.set("user", { token: response.data.token });
//       await req.session.save();
//       return res.status(200).json({ message: "Logged in" });
//     } else {
//       // If the response is not successful, return the status code
//       console.log("Invalid credentials, status: ", response.status);
//       return res
//         .status(response.status)
//         .json({
//           message: response.data.message || "Invalid email or password",
//         });
//     }
//   } catch (error) {
//     // If an error occurred during the request, log it and return a 500 status code
//     console.error("Error during authentication: ", error);
//     console.log("response statuuus in unauth: ", error.statusCode);
//     if (error == "AxiosError: Request failed with status code 429") {
//       return res.status(429).json({ message: "exceed rate limiter" });
//     } else if (error == "AxiosError: Request failed with status code 401") {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }
//     // return res.status(401).json({ message: "An error occurred while logging in" });
//   }
// });

import withSession from "../../sessionConfig";
import client from "@/client/client";

export default withSession(async (req: any, res: any) => {
  const { email, password } = req.body;

  const response = await client.post("/api/v2/auth/authenticate", {
    email,
    password,
  });

  if (response.status === 200 && response.data && response.data.token) {
    req.session.set("user", { token: response.data.token });
    await req.session.save();
    return res.status(200).json({ message: "Logged in" });
  } else if (
    response?.data?.status === 401 &&
    response?.data?.message == "Invalid email or password"
  ) {
    return res.status(401).json({ message: "Invalid email or password" });
  } else if (
    response?.data?.status === 429 &&
    response?.data?.message == "Too many login requests"
  ) {
    return res.status(429).json({ message: "Too many login requests" });
  }
});
