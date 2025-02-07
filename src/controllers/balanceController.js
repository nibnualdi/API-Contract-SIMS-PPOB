import { QueryTypes } from "sequelize";
import sequelize from "../config/connection.js";

const getABalanceByEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const resultsEmail = await sequelize.query("SELECT id,email FROM memberships WHERE email = ?", {
      replacements: [email],
      type: QueryTypes.SELECT,
    });
    const membership_id = resultsEmail[0].id;
    const results = await sequelize.query("SELECT balance FROM balances WHERE membership_id = ?", {
      replacements: [membership_id],
      type: QueryTypes.SELECT,
    });
    res
      .status(200)
      .json({
        status: 0,
        message: "Get Balance Berhasil",
        data: { balance: Number(results[0].balance) },
      });
  } catch (error) {
    console.log(error);
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

export { getABalanceByEmail };
