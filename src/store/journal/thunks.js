import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async(dispatch, getState) => {
        dispatch(savingNewNote())

        // Obtener uid
        const {uid} = getState().auth;
        // Crear nueva nota
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`)) // Referencia a la bbdd del proyecto
        const setDocResp = await setDoc(newDoc, newNote);

        newNote.id = newDoc.id // Se añade el id creado por Firestore a la variable NewNote

        // Dipatch's:
        // dispatch(newNote)
        dispatch(addNewEmptyNote(newNote))
        // dispatch(activeNote)
        dispatch(setActiveNote(newNote))
    }
}

export const startLoadingNotes = (uid) => {
    return async(dispatch) => {
        //const {uid} = getState().auth;
        if(!uid) throw new Error("No UID");
        const notes = await loadNotes(uid)
        //console.log("Desde el thunk",notes)
        dispatch(setNotes(notes)) // El dispatch solo admite objetos planos (en este contexto, un action). No admite funciones
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving())
        // 1. Obtener id de usuario y nota activa (aquella que ha sido editada en el NoteView)
        const {uid} = getState().auth;
        const {active:note} = getState().journal;
        // 2. No quiero que Firestore duplique el campo 'id' en la nota. Tengo que quitarlo antes de guardarla:
        const noteToFirestore= {...note};
        delete noteToFirestore.id;
        // Referencia a la nota en su colección
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        // Guardar los cambios en la nota especificada
        await setDoc(docRef, noteToFirestore, {merge:true}) // Este 3er arg se refiere a los settings: en este caso, indico con 'merge' que se haga una fusión entre los nuevos campos y los campos existentes. Si hay campos que no sufren cambios, estos se mantienen
        dispatch(updateNote(note)) // Este 'note' incluye el id

        //console.log(noteToFirestore)
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch, getState) => {
        // 1. Al empezar a cargar, disparamos setSaving: la app se pondrá en estado de carga y se bloquearán los botones
        dispatch(setSaving());
        console.log("Files recibidos en thunks",files);

        // HTTP request individual
        //const imgUrl = await fileUpload(files[0])

        // Array de HTTP requests / promises
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }
        // Disparar todas las promesas al mismo tiempo
        const photosUrls = await Promise.all(fileUploadPromises) // Se formará entonces un nuevo arreglo con todas las resoluciones de las promesas

        console.log(photosUrls);
        dispatch(setPhotosToActiveNote(photosUrls))
    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        const {active:note} = getState().journal;
        //console.log("Por borrar", uid, note)

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        // Borrar nota de Firestore
        await deleteDoc(docRef)
        // Borrar nota del store
        dispatch(deleteNoteById(note.id))
    }
}