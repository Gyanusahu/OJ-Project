const apis = () => {
  const local = "https://backend.coderush.space/";

  const list = {
    // 🧑 Auth (✅ add /api)
    registerUser: `${local}api/user/register`,
    loginUser: `${local}api/user/login`,
    userProfile: `${local}api/user/profile`,
    logout: `${local}api/user/logout`,
    getAccess: `${local}api/user/access`,

    // 📚 Problem APIs
    addProblem: `${local}api/problems/add`,
    getProblems: `${local}api/problems`,
    getProblemById: (id) => `${local}api/problems/${id}`,
    updateProblem: (id) => `${local}api/problems/update/${id}`,
    deleteProblem: (id) => `${local}api/problems/delete/${id}`,

    // 🏆 Leaderboard API ✅
    getLeaderboard: `${local}api/user/leaderboard`
  };

  return list;
};

export default apis;
