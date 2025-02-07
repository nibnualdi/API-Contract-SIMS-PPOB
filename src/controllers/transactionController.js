import { QueryTypes } from "sequelize";
import sequelize from "../config/connection.js";
import { v4 as uuidv4 } from "uuid";

const transaction = async (req, res) => {
  const { email, service_code } = req.body;

  try {
    const resultsService = await sequelize.query("SELECT * FROM services WHERE service_code = ?", {
      replacements: [service_code],
      type: QueryTypes.SELECT,
    });
    const resultsTransactionType = await sequelize.query(
      "SELECT id,name FROM transaction_types WHERE name = ?",
      {
        replacements: ["PAYMENT"],
        type: QueryTypes.SELECT,
      }
    );
    const resultsMembership = await sequelize.query(
      "SELECT id,email FROM memberships WHERE email = ?",
      {
        replacements: [email],
        type: QueryTypes.SELECT,
      }
    );

    if (!resultsService.length)
      return res.status(400).json({
        status: 102,
        message: "Service ataus Layanan tidak ditemukan",
        data: null,
      });

    const today = new Date();
    const { service_name, service_tariff: total_amount } = resultsService[0];
    const { id: transaction_type_id, name: transaction_type_name } = resultsTransactionType[0];
    const membership_id = resultsMembership[0].id;
    const uuid = uuidv4();
    await sequelize.query(
      "INSERT INTO `invoices` (`id`, `membership_id`, `transaction_type_id`, `description`, `total_amount`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?, ?)",
      {
        replacements: [
          uuid,
          membership_id,
          transaction_type_id,
          service_name,
          total_amount,
          today,
          today,
        ],
        type: QueryTypes.INSERT,
      }
    );

    const data = {
      invoice_number: uuid,
      service_code: service_code,
      service_name: service_name,
      transaction_type: transaction_type_name,
      total_amount: total_amount,
      created_on: today,
    };

    res.status(200).json({ status: 200, message: "Sukses", data });
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

export { transaction };
