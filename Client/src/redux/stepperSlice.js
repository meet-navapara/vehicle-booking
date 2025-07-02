import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 0,
  form: {
    firstName: '',
    lastName: '',
    vehicleType: '',
    model: '',
    startDate: null,
    endDate: null,
  },
};

const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    setFormValue: (state, action) => {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
    resetStepper: () => initialState,
  },
});

export const { nextStep, prevStep, setFormValue, resetStepper } = stepperSlice.actions;
export default stepperSlice.reducer; 