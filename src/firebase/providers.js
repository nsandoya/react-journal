import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile} from 'firebase/auth';
import { FirebaseAuth } from './config';

// Nueva instancia de...
const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
    try{
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const {uid, displayName, email, photoURL} = result.user;

        return{
            ok: true,
            displayName, email, photoURL, uid
        }
        //const credentials = GoogleAuthProvider.credentialFromResult(result);
        //console.log({credentials})
    } catch (error){
        const errorCode = error.code;
        const errorMessage = error.message;
        return{
            ok: false,
            errorCode, errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async ({email, password, displayName}) => {
    try{
        // Importar de Firebase:
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password); // 1. Al llamar esta fx y crearse correctamente el nuevo user, Firebase hace login de esta cuenta
        const {uid, photoURL} = resp.user;
        console.log(resp);
        // Pendiente: actualizar displayName en Firebase
        await updateProfile(FirebaseAuth.currentUser, {displayName}) // 2. Por ello podemos usar esta línea para conocer el user actual y, con esa info, actualizar su perfil
        return {
            ok: true,
            uid, photoURL, email, displayName
        }
    }catch(error){
        console.log(error)
        return {ok: false, errorMessage: error.message}
    }
}

export const loginWithEmailPassword = async ({email, password}) => {
    // Es necesario usar la fx de Firebase: singInWithEmailAndPassword
    try{
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL, displayName} = resp.user;
        return{
            ok: true, uid, photoURL, displayName
        }
        
    }catch(error){
        console.log(error)
        return {ok: false, errorMessage: error.message}
    }
}

export const logoutWithFirebase = async() => {
    return await FirebaseAuth.signOut();
}

