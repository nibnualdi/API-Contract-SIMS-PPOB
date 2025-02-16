import { QueryTypes } from "sequelize";
import sequelize from "../config/connection.js";
import multer from "multer";

const getAProfile = async (req, res) => {
  const { email } = req.body;
  console.log(email, "email profile");

  try {
    const results = await sequelize.query(
      "SELECT email,first_name,last_name,profile_image FROM memberships WHERE email = ?",
      {
        replacements: [email],
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({ status: 0, message: "Sukses", data: results[0] });
  } catch (error) {
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

const updateAProfile = async (req, res) => {
  const { email, first_name, last_name } = req.body;
  console.log(email, "email profile");

  try {
    await sequelize.query("UPDATE memberships SET first_name = ?, last_name = ? WHERE email = ?", {
      replacements: [first_name, last_name, email],
      type: QueryTypes.UPDATE,
    });

    const results = await sequelize.query(
      "SELECT email,first_name,last_name,profile_image FROM memberships WHERE email = ?",
      {
        replacements: [email],
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({ status: 0, message: "Update Pofile berhasil", data: results[0] });
  } catch (error) {
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

const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      new Date().toISOString().replace(/:/g, "-") + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + "screenshot" + "_" + file.originalname);
  },
});

const multerUpload = multer({ storage });

const updateProfileImage = (req, res) => {
  const { email } = req.body;
  multerUpload.single("file")(req, res, async (error) => {
    if (error) {
      res.status(400).json({
        status: 100,
        message: "Gagal mengupload file!",
        data: null
      });
      return;
    }
    if (!req.file) {
      res.status(400).json({
        status: 100,
        message: "Pastikan file sudah terpilih!",
        data: null
      });
      return;
    }
    if (req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpeg") {
      res.status(400).json({
        status: 102,
        message: "Format Image tidak sesuai",
        data: null
      });
      return;
    }
    try {
      const path = `${req.file?.destination}/${req.file?.filename}`;
      const url = `http://localhost:${port}/${path}`;

      await sequelize.query("UPDATE memberships SET profile_image = ? WHERE email = ?", {
        replacements: [url, email],
        type: QueryTypes.UPDATE,
      });

      const results = await sequelize.query(
        "SELECT email,first_name,last_name,profile_image FROM memberships WHERE email = ?",
        {
          replacements: [email],
          type: QueryTypes.SELECT,
        }
      );

      res.status(200).json({ status: 0, message: "Update Profile Image berhasil", data: results[0] });
    } catch (error) {
      if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError")
        return res.status(401).json({
          status: 108,
          message: "Token tidak valid atau kadaluwarsa",
          data: null,
        });

      // default error
      return res.status(500).json({ status: 500, message: "Internal Server Error", data: null });
    }
  });
};

export { getAProfile, updateAProfile, updateProfileImage };
