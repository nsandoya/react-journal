import { collection, getDocs } from 'firebase/firestore/lite';
import React from 'react'
import { FirebaseDB } from '../firebase/config';

export const loadNotes = async(uid = '') => {
    if(!uid) throw new Error("No UID");
    // Referencia a la colección a usar
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);
    //console.log(docs)
    const notes = [];
    docs.forEach(doc => {
        notes.push({id: doc.id, ...doc.data()})
    });
    //console.log(notes);

    return notes
}

//export default loadNotes
