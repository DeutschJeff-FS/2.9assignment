const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    return { Authorization: user.token };
  } else {
    return {};
  }
};

export default authHeader;
