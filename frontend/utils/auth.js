export const isAuthenticated = () => {
    if (typeof window !== "undefined") {
      const userInfo = localStorage.getItem("userInfo");
      return userInfo ? JSON.parse(userInfo) : null;
    }
    return null;
  };
  