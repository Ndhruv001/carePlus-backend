import { insertUserQuery } from "../../queries/user/contactUsQueries.js";

async function contactUs(req, res) {
  const { name, email, message } = req.body;

  try {
    const response = await insertUserQuery({ name, email, message });
    return res.status(201).json({ success: true, queryId: response.insertId });
  } catch (error) {
    console.log("🚀 ~ contactUs ~ error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message || "",
      });
  }
}

export { contactUs };
