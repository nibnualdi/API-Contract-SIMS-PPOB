import sequelize from "../config/connection.js";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { QueryTypes } from "sequelize";

const schema = Joi.object({
  first_name: Joi.string().required().messages({
    "any.required": "Parameter first_name harus di isi",
  }),
  last_name: Joi.string().required().messages({
    "any.required": "Parameter last_name harus di isi",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Parameter email harus di isi",
    "string.email": "Paramter email tidak sesuai format",
  }),
  password: Joi.string().min(8).required().messages({
    "any.required": "Parameter password harus di isi",
  }),
});

const signup = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    await schema.validateAsync({ first_name, last_name, email, password });
    const today = new Date();
    const results = await sequelize.query(
      "INSERT INTO `memberships` (`id`, `first_name`, `last_name`, `email`, `password`, `profile_image`, `created_at`, `updated_at`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)",
      {
        replacements: [first_name, last_name, email, password, null, today, today],
        type: QueryTypes.INSERT,
      }
    );

    // create the balance for the membership
    const membership_id = results[0]
    await sequelize.query(
      "INSERT INTO `balances` (`membership_id`, `created_at`, `updated_at`) VALUES (?, ?, ?)",
      {
        replacements: [membership_id, today, today],
        type: QueryTypes.INSERT,
      }
    );
    res
      .status(200)
      .json({ status: 200, message: "Registrasi berhasil silahkan login", data: null });
  } catch (error) {
    console.log(error)
    // joi errors
    if (error.details)
      return res.status(400).json({ status: 102, message: error.details[0].message, data: null });

    // database errors
    const column = error?.errors[0]?.path || '';
    const errorType = error?.errors[0]?.type || '';
    console.log(error);
    if (errorType === "unique violation")
      return res
        .status(400)
        .json({ status: 400, message: `${column} sudah terdaftar`, data: null });
    return res.status(500).json({ status: 500, message: "Internal Server Error", data: null });
  }
};

const generateToken = (data) => {
  const privateKey = process.env.PRIVATE_KEY;
  const expiresIn = 43200;
  const accessToken = jwt.sign(data, privateKey, { expiresIn });

  return { accessToken, expiresIn };
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    await schema
      .fork(["first_name", "last_name"], (schema) => schema.optional())
      .validateAsync({ email, password });
    const results = await sequelize.query(
      "SELECT email FROM memberships WHERE email = ? AND password = ?",
      {
        replacements: [email, password],
        type: QueryTypes.SELECT,
      }
    );

    if (!results.length) throw { status: 103, message: "Username atau password salah", data: null };

    const { accessToken } = generateToken({
      email: results[0].email,
    });
    res.status(200).json({
      status: 200,
      message: "Login Sukses",
      data: {
        token: accessToken,
      },
    });
  } catch (error) {
    // joi errors
    if (error.details)
      return res.status(400).json({ status: 102, message: error.details[0].message, data: null });

    if (error.message === "Username atau password salah")
      return res.status(401).json({ status: 103, message: "Username atau password salah", data: null });

    // default error
    return res.status(500).json({ status: 500, message: "Internal Server Error", data: null });
  }
};

export { signup, login };
