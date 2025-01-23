import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "./../../utils/db";
import { validateLogin } from "~/server/validators/auth";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { phone_no, password } = body;

    const { isValid, errors } = validateLogin(body);
    if (!isValid) {
      return {
        status: 400,
        errors,
        message: "Validation failed",
      };
    }

    if (!phone_no || !password)
      return { status: 400, message: "Phone number and password are required" };

    const user = await db.user.findUnique({
      where: {
        phone_no: phone_no,
      },
    });

    if (!user) return { status: 404, message: "User not found" };

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return { status: 401, message: "Invalid password" };

    // token generation for the user
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "my_jwt_Secret",
      {
        expiresIn: "1d",
      }
    );

    return { status: 200, message: "Login successful", token, user };
  } catch (error) {
    return { status: 500, message: "Internal server error" + error.message };
  } finally {
    await db.$disconnect();
  }
});
