// import React, { useEffect, useState } from "react";
// import { AuthContext } from "./AuthContext";
// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import { auth } from "../firebase/firebase.init";

// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   // Create user with email, password and update displayName
//   const createUser = (email, password, name) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password).then(
//       (userCredential) => {
//         return updateProfile(userCredential.user, {
//           displayName: name,
//         }).then(() => {
//           return userCredential;
//         });
//       }
//     );
//   };

//   const signInUser = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const signInWithGoogle = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };

//   const signOutUser = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

//   useEffect(() => {
//     const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       // jwt

//       setLoading(false);
//       console.log("user in the auth state change", currentUser);
//     });
//     return () => {
//       unSubscribe();
//     };
//   }, []); // Run once on mount

//   const authInfo = {
//     loading,
//     user,
//     createUser,
//     signInUser,
//     signOutUser,
//     signInWithGoogle,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;

import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Create user and update display name
  const createUser = (email, password, name) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        return updateProfile(userCredential.user, {
          displayName: name,
        }).then(() => userCredential);
      }
    );
  };

  // Sign in with email/password
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Log out user and clear token
  const signOutUser = () => {
    setLoading(true);
    localStorage.removeItem("token");
    return signOut(auth);
  };

  // Listen for user state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // 🔐 Send user info to your backend to get JWT
        fetch("https://your-backend.com/jwt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: currentUser.email }),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("token", data.token);
            console.log("JWT token stored:", data.token);
          })
          .catch((err) => {
            console.error("JWT fetch error:", err);
          });
      } else {
        localStorage.removeItem("token");
      }

      console.log("🔄 Auth state changed:", currentUser?.email || "No user");
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    loading,
    user,
    createUser,
    signInUser,
    signOutUser,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
