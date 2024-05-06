import bcrypt from "bcrypt";

const saltRounds = 10;

const encryptPassword = async (password: string) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "password encryption failed"
    );
  }
};

const verifyPassword = async (userPassword: string, hashedPassword: string) => {
  try {
    const isMatch = await bcrypt.compare(userPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.log("password comparison failed with error:", error);
    throw new Error(
      error instanceof Error ? error.message : "password comparison failed"
    );
  }
};

export { encryptPassword, verifyPassword };
