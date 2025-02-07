import { QueryTypes } from "sequelize";
import sequelize from "../config/connection.js";

const getABalanceByEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const results = await sequelize.query("SELECT balance FROM balances b JOIN memberships m ON b.membership_id = m.id WHERE email = ?", {
      replacements: [email],
      type: QueryTypes.SELECT,
    });
    res.status(200).json({
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

const topup = async (req, res) => {
  const { email, top_up_amount } = req.body;

  if (top_up_amount < 0)
    return res.status(400).json({
      status: 102,
      message: "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
      data: null,
    });

  try {
    await sequelize.query(
      "UPDATE balances b JOIN memberships m ON b.membership_id = m.id SET b.balance = b.balance + ? WHERE m.email = ?",
      {
        replacements: [top_up_amount, email],
        type: QueryTypes.UPDATE,
      }
    );
    const results = await sequelize.query(
      "SELECT balance FROM balances b JOIN memberships m ON b.membership_id = m.id WHERE m.email = ?",
      {
        replacements: [email],
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({ status: 200, message: "Sukses", data: results[0] });
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

export { getABalanceByEmail, topup };
