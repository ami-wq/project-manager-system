import type { Task } from '../types/task';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface TaskModalState {
  isOpen: boolean;
  mode: 'create' | 'edit';
  selectedTask: Task | null;
  boardId?: number;
  isBoardPredetermined?: boolean;
}

const initialState: TaskModalState = {
  isOpen: false,
  mode: 'create',
  selectedTask: null,
  boardId: undefined,
  isBoardPredetermined: false,
};

const taskModalSlice = createSlice({
  name: 'taskModal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<Omit<TaskModalState, 'isOpen'>>) {
      state.isOpen = true;
      state.mode = action.payload.mode;
      state.selectedTask = action.payload.selectedTask;
      state.boardId = action.payload.boardId;
      state.isBoardPredetermined = action.payload.isBoardPredetermined ?? false;
    },
    closeModal(state) {
      state.isOpen = false;
      state.selectedTask = null;
      state.boardId = undefined;
      state.isBoardPredetermined = false;
    },
  },
});

export const { openModal, closeModal } = taskModalSlice.actions;
export default taskModalSlice.reducer;
