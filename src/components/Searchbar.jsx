import React, { useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';


const Searchbar = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const handleSearch = async() => {

    const q = query(collection(db, "users"), where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setUser(null);
          setErr(true);
        } else {
          querySnapshot.forEach((doc) => {
            setUser(doc.data());
          });
          setErr(false);
        }
    } catch (err) {
      setErr(true)
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='search'>
        <div className='searchForm'>
            <input 
              type='text' 
              placeholder='Find a user'
              onKeyDown={handleKey}
              onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        {user && (
          <div className='userChat'>
            <img src={user.photoURL} />
            <div className='userChatInfo'>
                <span>{user.displayName}</span>
            </div>
          </div>
        )}
        {err && <span>User not Found</span>}
    </div> 
  )
}

export default Searchbar