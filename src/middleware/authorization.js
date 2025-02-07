import jwt from "jsonwebtoken";

const accessTokenOnly = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1] || "";
  const privateKey = process.env.PRIVATE_KEY;

  try {
    const jwtRes = jwt.verify(accessToken, privateKey);
    req.body.email = jwtRes.email;
    next();
  } catch (error) {
    console.log(error)
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError")
      return res.status(401).json({
        status: 108,
        message: "Token tidak valid atau kadaluwarsa",
        data: null,
      });

    // default error
    return res.status(500).json({ status: 500, message: "Internal Server Error", data: null });
  }
};

export { accessTokenOnly };
