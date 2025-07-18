const apis = () => {
  const local = "http://localhost:5050/";

  const list = {
    // 🧑 Auth
    registerUser: `${local}user/register`,
    loginUser: `${local}user/login`,
    userProfile: `${local}user/profile`,
    logout: `${local}user/logout`,
    getAccess: `${local}user/access`,

    // 📚 Problem APIs
    addProblem: `${local}api/problems/add`,
    getProblems: `${local}api/problems`,       // supports query ?title=...&tag=...&difficulty=...&page=1&limit=5
    getProblemById: (id) => `${local}api/problems/${id}`,
    updateProblem: (id) => `${local}api/problems/update/${id}`,  // if you support edit
    deleteProblem: (id) => `${local}api/problems/delete/${id}`   // if you support delete
  };

  return list;
};

export default apis;
