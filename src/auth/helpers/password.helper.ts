import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, SALT_ROUNDS);
};

export const comparePassword = (
  plainPassword: string,
  hashedPassword: string,
): boolean => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
