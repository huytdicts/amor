import * as bcrypt from 'bcryptjs';

function hash(payload: string, saltRounds = 10) {
  return bcrypt.hashSync(payload, saltRounds);
}

function compare(payload: string, hashed: string) {
  return bcrypt.compareSync(payload, hashed);
}
export const encryptHelper = {
    hash,
    compare
}

