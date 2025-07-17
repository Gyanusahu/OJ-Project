

const apis=()=>{
    const local="http://localhost:5050/";
    const list={
        registerUser:`${local}user/register`,
        loginUser:`${local}user/login`,
        userProfile:`${local}user/profile`,
        logout:`${local}user/logout`,
        getAccess:`${local}user/access`
    };
    return list
};
export default apis