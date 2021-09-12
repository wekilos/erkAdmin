export const logout = () => {
    localStorage.removeItem("profile");
    window.location.href="/"
  };
  
  export const isLogin = () => {
    if (localStorage.getItem("profile")) {
      var data = JSON.parse(localStorage.getItem("profile"));
      if (data.token) {
        return true;
      } else {
        localStorage.removeItem("profile");
      }
    }
    return false;
  };
  
  export const isLoginAdmin = () => {
    if (localStorage.getItem("profile")) {
      var data = JSON.parse(localStorage.getItem("profile"));
      if (data.token) {
        return true;
      } else {
        localStorage.removeItem("profile");
      }
    } else {
      return false;
    }
  };
  