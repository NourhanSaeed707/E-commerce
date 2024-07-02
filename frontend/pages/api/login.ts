import withSession from "../../sessionConfig";
import client from "@/client/client";

export default withSession(async (req: any, res: any) => {
  console.log("insiiiiiide login api");
  const { email, password } = req.body;
  const response = await client.post("/api/v2/auth/authenticate", {
    email,
    password,
  });
  if (response.data && response.data.token) {
    req.session.set("user", { token: response.data.token });
    await req.session.save();
    res.status(200).json({ message: "Logged in" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});
