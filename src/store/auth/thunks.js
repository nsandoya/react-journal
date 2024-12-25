import { loginWithEmailPassword, logoutWithFirebase, registerUserWithEmailPassword, singInWithGoogle } from '../../firebase/providers'
import { clearNotesLogout } from '../journal'
import {checkingCredentials, login, logout} from './'

// Tareas asíncronas
export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
    }
}

export const startGoogleSingin = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await singInWithGoogle();
        console.log({result});

        if(!result.ok) return dispatch (logout(result.errorMessage));

        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({password, email, displayName}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials()); // Para bloquear botones mientras se realiza el proceso de registro

        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});

        if(ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid, displayName, email, photoURL}))

        //console.log(resp)
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
     return async (dispatch) => {
        dispatch(checkingCredentials());
        const resp = await loginWithEmailPassword({email, password});
        console.log(resp);

        if(!resp.ok) return dispatch(logout(resp));

        dispatch(login(resp))
     }
}

export const startLogOut = () => {
    return async(dispatch) => {
        try{
            await logoutWithFirebase();
            dispatch(clearNotesLogout())
            dispatch(logout({errorMessage:''}))
        }catch(error){
            console.log(error)
            return {ok: false, errorMessage: error.message}
        }

    }
}