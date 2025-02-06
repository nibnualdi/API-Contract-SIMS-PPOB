import sequelize from "../config/connection.js";
import Joi from "joi";
import { QueryTypes } from "sequelize";

const schema = Joi.object({
  firstName: Joi.string().required().messages({
    "any.required": "Parameter first_name harus di isi",
  }),
  lastName: Joi.string().required().messages({
    "any.required": "Parameter last_name harus di isi",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Parameter email harus di isi",
    "string.email": "Paramter email tidak sesuai format",
  }),
  password: Joi.string().required().messages({
    "any.required": "Parameter password harus di isi",
  }),
});

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    await schema.validateAsync({ firstName, lastName, email, password });
    const today = new Date();
    const results = await sequelize.query(
      "INSERT INTO `memberships` (`id`, `first_name`, `last_name`, `email`, `password`, `profile_image`, `created_at`, `updated_at`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)",
      {
        replacements: [firstName, lastName, email, password, null, today, today],
        type: QueryTypes.INSERT,
      }
    );
    res.status(200).json({ status: 200, message: "Registrasi berhasil silahkan login", data: null });
  } catch (error) {
    // joi errors
    if (error.details) return res.status(400).json({ status: 102, message: error.details[0].message, data: null });

    // database errors
    const column = error.errors[0].path
    const errorType = error.errors[0].type
    console.log(error)
    if(errorType === "unique violation") return res.status(400).json({ status: 400, message: `${column} sudah terdaftar`, data: null });
    return res.status(500).json({ status: 500, message: "Internal Server Error", data: null });
  }
};

export { signup };
