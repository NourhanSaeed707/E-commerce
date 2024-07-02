import withSession from "../../sessionConfig";

export default withSession(async (req, res) => {
  const accessToken = req.session.get("user") || null;
  res.send({ accessToken });
});
