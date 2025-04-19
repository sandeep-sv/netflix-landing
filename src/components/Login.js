import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData, checkValidData1 } from "../utils/validate";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword ,updateProfile} from "firebase/auth";
import { auth } from "../utils/fireBase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const handelButtonClick = () => {

        let message;

        if(isSignInForm){
             message = checkValidData(email.current.value, password.current.value);
        }
        else{
             message = checkValidData1(email.current.value, password.current.value, name?.current.value);
        }
        setErrorMsg(message);

        if(message) return;
        
        if(!isSignInForm){
            // sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(auth.currentUser, {
                        displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
                      }).then(() => {

                        const {uid,email,displayName} = auth.currentUser;
                        dispatch(addUser({
                            uid:uid,
                            email:email,
                            displayName:displayName
                        }));
                      }).catch((error) => {
                        setErrorMsg(error.message)
                      });
                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMsg(errorCode+"-"+errorMessage);

                });
        }
        else{
            // sign in logic
            signInWithEmailAndPassword(auth,email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                
                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMsg(errorCode+"-"+errorMessage);
                });
        }
    };

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
        setErrorMsg(null); 
    }

    return (
        <div className="relative min-h-screen">
            <Header />
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    className="object-cover w-full h-full"
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/f272782d-cf96-4988-a675-6db2afd165e0/web/CA-en-20241008-TRIFECTA-perspective_b7d6e4b6-53c6-4f40-9303-11ff7ee01473_large.jpg"
                    alt="Background"
                />
            </div>

            {/* Form */}
            <div className="relative z-10 flex items-center justify-center h-screen">
                <form onSubmit={(e) => e.preventDefault()} className="p-12 bg-black  text-white bg-opacity-80 rounded-lg w-[80%]  md:w-[53%] lg:w-[37%] xl:w-[30%]">
                    <h1 className="font-bold text-3xl p-2 my-2">
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </h1>

                    {/* Name Field (only for sign-up) */}
                    {!isSignInForm && (
                        <input
                            ref={name}
                            type="text"
                            placeholder="Name"
                            className="p-4 my-2 w-full bg-gray-600 rounded-sm"
                        />
                    )}

                    {/* Email and Password Fields */}
                    <input
                        ref={email}
                        type="text"
                        placeholder="Email or Phone Number"
                        className="p-4 my-2 w-full bg-gray-600 rounded-sm"
                    />

                    <input
                        ref={password}
                        type="password"
                        placeholder="Password"
                        className="p-4 my-2 w-full bg-gray-600 rounded-sm"
                    />

                    {/* Error Message */}
                    {errorMsg && (
                        <p className="text-red-500 font-bold text-lg py-2">
                            {errorMsg}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        className="p-4 my-6 bg-red-700 w-full rounded-sm"
                        onClick={handelButtonClick}
                    >
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>

                    {/* Toggle between Sign-In and Sign-Up */}
                    <p
                        onClick={toggleSignInForm}
                        className="p-4 cursor-pointer text-center underline"
                    >
                        {isSignInForm ? "New to Netflix? Sign Up Now." : "Already Registered? Sign In Now."}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
