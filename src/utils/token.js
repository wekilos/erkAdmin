export const token = () => {
    if (JSON.parse(localStorage.getItem("profile"))) {
      var data = JSON.parse(localStorage.getItem("profile"));
      return data.token;
    }
  };
  