import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({children}) {
    const [user,setUser] = useState({id:0,
    name:'',
    email:'',
    npm:'',
    denda:0,
    });

    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext