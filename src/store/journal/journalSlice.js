import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    // Indicador: Estoy guardando la nota en cuestión?
    isSaving: false,
    // Mensaje: Nueva nota incorporada
    messageSaved: '',
    // Notas de nuestro journal/diario
    notes: [],
    // Nota activa
    active: null,
    
    /* Estructura de una nota = {
        id: '124124', // Esto lo proporcionará Firebase
        title: '',
        body: '',
        date: 20240607,
        imageUrls: [] // Array de img links (imgs alojadas en Cloudinary)
    }

    */
  },
  // Tareas síncronas (exclusivamente)
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true
    },
    addNewEmptyNote: (state , action) => {
      state.notes.push(action.payload) // Incorpora a las notas el nuevo registro, el cual viene incluido en el action.payload
      state.isSaving = false
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = ''
    },
    setNotes: (state, action) => {
      state.notes = [];
      state.active = null;
      state.notes.push(...action.payload)
    },
    setSaving: (state, action) => {
      state.isSaving = true;
      state.messageSaved = ''
    },
    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map(note => {
        // Con map se crea un nuevo array, y sus elementos se actualizan (reemplazan) según un criterio. En este caso, se reemplaza una nota si su id coincide con el id de la nota ingresada como payload
        if(note.id === action.payload.id) {
          return action.payload
        }
        // Si el id no coincide, retornamos la nota actual sin cambios
        return note
      });
      state.messageSaved = `${action.payload.title}: Nota actualizada correctamente :)`;
      // Y hasta aquí: Los reducers no deben disparar funciones externas/ajenas a su contexto (en este caso, no podemos disparar desde acá las funciones de sweet alert)
    },
    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },

    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null
    },

    deleteNoteById: (state, action) => {
      // Quitar nota de 'notes' y 'active'
      state.notes = state.notes.filter(note => (note.id != action.payload))
      state.active = null
    }
  },
});


// Los 'action creators' son generados por cada reducer
export const { 
    savingNewNote, 
    addNewEmptyNote, 
    setActiveNote,
    setNotes, 
    setSaving, 
    updateNote,
    setPhotosToActiveNote, 
    clearNotesLogout,
    deleteNoteById  
} = journalSlice.actions;

export default journalSlice.reducer;