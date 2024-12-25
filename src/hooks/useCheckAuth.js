import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { FirebaseAuth } from "../firebase/config";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = () => {
    const {status} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  
    useEffect(() => {
        // Esto retorna un observable (rxjs) : una función que emite valores cada vez que el estado de la autenticación cambia
        onAuthStateChanged(FirebaseAuth, async(user) => {
        // Qué hacemos cuando se detecte un nuevo valor?
        if(!user) return dispatch(logout());
        const {uid, email, displayName, photoURL} = user
        dispatch(login({uid, email, displayName, photoURL}));
        dispatch(startLoadingNotes(uid))
        //console.log(user)
        })
    }, []);

    return {status}
}