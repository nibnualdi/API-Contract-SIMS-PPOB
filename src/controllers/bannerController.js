import { QueryTypes } from "sequelize";
import sequelize from "../config/connection.js";

const getBanners = async (req, res) => {
  try {
    const results = await sequelize.query(
      "SELECT banner_name,banner_image,description FROM banners",
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({ status: 0, message: "Sukses", data: results });
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

export { getBanners };
