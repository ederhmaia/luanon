const randomNumber = (a, b) => {
  const ran = Math.floor(Math.random() * b) + a;
  return ran;
};

module.exports = {
  randomNumber,
};
