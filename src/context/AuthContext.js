import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [currentUser,setCurrentUser] = useState(null);//edited

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
            console.log(user);
        });
        return ()=>{ //to stop memory leakage
            unsub();
        }
    },[]);


    return(
    <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>
    );
};