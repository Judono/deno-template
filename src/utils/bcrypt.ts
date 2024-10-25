import * as bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, bcrypt.genSaltSync(10));
};

export const comparePassword = async (password: string, hashedPassword?: string | unknown): Promise<boolean> => {
  if (!hashedPassword || typeof hashedPassword !== "string") {
    return false;
  }
  return await bcrypt.compare(password, hashedPassword);
};