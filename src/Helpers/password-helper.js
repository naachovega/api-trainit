const { randomBytes, pbkdf2Sync } = await import("node:crypto");

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");

  const hash = pbkdf2Sync(
    password.toString(),
    salt,
    1000,
    64,
    `sha512`
  ).toString(`hex`);

  const returnObject = {
    hash: hash,
    salt: salt,
  };
  return returnObject;
}

function validatePassowrd(password, salt, hashedPassword) {
  const hash = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

  return hash === hashedPassword;
}

export { hashPassword, validatePassowrd };
