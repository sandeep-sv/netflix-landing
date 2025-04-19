import { signOut } from "firebase/auth";
import { auth } from "../utils/fireBase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser,removeUser } from "../utils/userSlice";
import {onAuthStateChanged } from "firebase/auth";
import { LOGO, USER_AVATAR } from "../utils/constants";

const Header = ()=>{
    const user = useSelector((store)=>store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignOut = ()=>{
        signOut(auth).then(() => {  
          }).catch((error) => {
            navigate("/error");
          });

    }

    useEffect(()=>{

       const unsubscribe =  onAuthStateChanged(auth, (user) => {
            if (user) {
              const {uid,email , displayName} = user;
              dispatch(addUser({
                uid:uid,
                email:email,
                displayName:displayName
              }));
              navigate("/browse")
              
              
            } else {
              dispatch(removeUser());
              navigate("/")
              
            }
          });

          return ()=> unsubscribe();

    },[])

    return (
      <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen">
        <div className="flex justify-between items-center">
          {/* Left side: Logo + Navigation */}
          <div className="flex items-center">
            <img
              className="w-16 md:w-28 lg:w-40"
              src={LOGO}
              alt="logo"
            />
            {user && (
              <ul className="flex px-4 text-white">
                <li className="m-2 md:m-4">Home</li>
                <li className="m-2 md:m-4">TV Shows</li>
                <li className="m-2 md:m-4">Movies</li>
                <li className="m-2 md:m-4">New & Popular</li>
                <li className="m-2 md:m-4">My List</li>
                <li className="m-2 md:m-4">Browse By Language</li>
              </ul>
            )}
          </div>
    
          {/* Right side: Avatar + Sign Out */}
          {user && (
            <div className="flex items-center">
              <img className="w-10 h-10 rounded-lg" src={USER_AVATAR} alt="User avatar" />
              <button
                onClick={handleSignOut}
                className="font-bold text-white ml-2 md:ml-4"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    );
    
}

export default Header;