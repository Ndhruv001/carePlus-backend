import { addNewAdminQuery } from "../../queries/admin/adminQueries.js";
import { encryptPassword } from "../../utils/password.js";

async function addNewAdmin(req, res) {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await encryptPassword(password);
    await addNewAdminQuery({ name, email, password: hashedPassword });

    return res
      .status(200)
      .json({ success: true, message: "New admin add successfully!" });
  } catch (error) {
    console.log("🚀 ~ addNewAdmin ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
}

export { addNewAdmin };
