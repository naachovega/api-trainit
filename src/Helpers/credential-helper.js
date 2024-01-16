function generateCredential() {
  return `${Math.floor(Math.random() * 10000) + 1}-${
    Math.floor(Math.random() * 10000) + 1
  }-${Math.floor(Math.random() * 10000) + 1}-${
    Math.floor(Math.random() * 10000) + 1
  }`;
}

export { generateCredential };
