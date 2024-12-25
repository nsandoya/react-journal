import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal';

export const JournalPage = () => {
  const dispatch = useDispatch();
  const {isSaving, active} = useSelector(state => state.journal)

  const onClickNewNote = () => {
    // Podemos incorporar el uid del usuario directamente desde los thunks, ya que tenemos acceso al store
    dispatch(startNewNote())
  }

  return (
    <JournalLayout>
      {/* Renderizado condicional: Existe una nota activa? */}
      {active? <NoteView /> : <NothingSelectedView />}
      


      <IconButton
        onClick={onClickNewNote}
        disabled={isSaving}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>
  )
}
