import { QueryTypes } from "sequelize";
import sequelize from "../config/connection.js";

const getAProfile = async (req, res) => {
  const { email } = req.body;
  console.log(email, "email profile")

  try {
    const results = await sequelize.query("SELECT email,first_name,last_name,profile_image FROM memberships WHERE email = ?", {
      replacements: [email],
      type: QueryTypes.SELECT,
    });
    res
      .status(200)
      .json({ status: 200, message: "Sukses", data: results[0] });
  } catch (error) {
    if (error.name === "JsonWebTokenError")
      return res.status(401).json({
        status: 108,
        message: "Token tidak valid atau kadaluwarsa",
        data: null,
      });

    // default error
    return res.status(500).json({ status: 500, message: "Internal Server Error", data: null });
  }
};

const updateAProfile = async (req, res) => {
  const { email, first_name, last_name } = req.body;
  console.log(email, "email profile")

  try {
    await sequelize.query("UPDATE memberships SET first_name = ?, last_name = ? WHERE email = ?", {
      replacements: [first_name, last_name, email],
      type: QueryTypes.UPDATE,
    });

    const results = await sequelize.query("SELECT email,first_name,last_name,profile_image FROM memberships WHERE email = ?", {
      replacements: [email],
      type: QueryTypes.SELECT,
    });

    res
      .status(200)
      .json({ status: 200, message: "Sukses", data: results[0] });
  } catch (error) {
    if (error.name === "JsonWebTokenError")
      return res.status(401).json({
        status: 108,
        message: "Token tidak valid atau kadaluwarsa",
        data: null,
      });

    // default error
    return res.status(500).json({ status: 500, message: "Internal Server Error", data: null });
  }
};

export { getAProfile, updateAProfile };
