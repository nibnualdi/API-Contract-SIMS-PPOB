import Joi from "joi";

const authSchema = Joi.object({
  first_name: Joi.string().required().messages({
    "any.required": "Parameter first_name harus di isi",
    "string.empty": "Parameter first_name harus di isi",
  }),
  last_name: Joi.string().required().messages({
    "any.required": "Parameter last_name harus di isi",
    "string.empty": "Parameter last_name harus di isi",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Parameter email harus di isi",
    "string.email": "Paramter email tidak sesuai format",
    "string.empty": "Paramter email tidak sesuai format",
  }),
  password: Joi.string().min(8).required().messages({
    "any.required": "Parameter password harus di isi",
    "string.empty": "Parameter password harus di isi",
  }),
});

export default authSchema;
