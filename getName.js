const getName = player => {
  let firstName = "";
  let lastName = "";
  if (player) {
    firstName =
      player && player.type !== "R"
        ? player.proxy_name
        : player.user.first_name;
    lastName =
      player && player.type !== "R"
        ? player.proxy_surname
        : player.user.last_name;
  }

  return `${firstName} ${lastName}`;
};

export default getName;
