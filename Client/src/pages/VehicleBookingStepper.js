import React, { useState, useEffect, useRef } from 'react';
import { Stepper, Step, StepLabel, Box, Button, Typography, StepConnector, styled } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import UserNameStep from '../components/UserNameStep';
import VehicleTypeStep from '../components/VehicleTypeStep';
import VehicleSubTypeStep from '../components/VehicleSubTypeStep';
import VehicleModelStep from '../components/VehicleModelStep';
import BookingDateStep from '../components/BookingDateStep';
import { getTypes, getModels, bookVehicle } from '../vehicleBookingApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { steps, vehicleTypeOptions, initialValues } from '../constants/stepperConstants';

const validationSchemas = [
  Yup.object({
    firstName: Yup.string()
      .trim('No leading or trailing spaces allowed')
      .strict(true)
      .required('First name is required')
      .matches(/^[A-Za-z ]+$/, 'Only letters are allowed')
      .min(1, 'First name must be at least 1 character'),
    lastName: Yup.string()
      .trim('No leading or trailing spaces')
      .strict(true)
      .required('Last name is required')
      .matches(/^[A-Za-z ]+$/, 'Only letters are allowed')
      .min(1, 'Last name must be at least 1 character'),
  }),
  Yup.object({
    vehicleType: Yup.string().required('Please select a vehicle type'),
  }),
  Yup.object({
    type: Yup.string().required('Please select a type'),
  }),
  Yup.object({
    model: Yup.string().required('Please select a model'),
    startDate: Yup.date().nullable().required('Start date is required'),
    endDate: Yup.date().nullable().required('End date is required'),
  }),
];

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& .MuiStepConnector-line': {
      backgroundColor: '#43b672',
    },
  },
  completed: {
    '& .MuiStepConnector-line': {
      backgroundColor: '#43b672',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#e0e0e0',
    borderRadius: 1,
  },
}));

const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  '& .MuiStepLabel-label.Mui-active': {
    color: '#43b672',
    fontWeight: 700,
  },
  '& .MuiStepLabel-label.Mui-completed': {
    color: '#43b672',
    fontWeight: 700,
  },
  '& .MuiStepIcon-root.Mui-active': {
    color: '#43b672',
  },
  '& .MuiStepIcon-root.Mui-completed': {
    color: '#43b672',
  },
}));

const StepperForm = () => {
  const [step, setStep] = useState(0);
  const [types, setTypes] = useState([]);
  const [vehicleModels, setVehicleModels] = useState([]);
  const [loadingSubTypes, setLoadingSubTypes] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const formikRef = useRef();

  useEffect(() => {
    if (step === 2 && formikRef.current?.values.vehicleType) {
      setLoadingSubTypes(true);
      setApiError('');
      const wheels = formikRef.current.values.vehicleType === '2_wheels' ? 2 : 4;
      getTypes(wheels)
        .then(res => {
          console.log('API types response:', res);
          if (Array.isArray(res)) {
            setTypes(res);
          } else if (Array.isArray(res.data)) {
            setTypes(res.data);
          } else {
            setTypes([]);
          }
          setLoadingSubTypes(false);
        })
        .catch(err => {
          setApiError('Failed to load types');
          setLoadingSubTypes(false);
        });
    }
  }, [step]);

  useEffect(() => {
    if (step === 3 && formikRef.current?.values.type) {
      setLoadingModels(true);
      setApiError('');
      getModels(formikRef.current.values.type)
        .then(res => {
          console.log('API models response:', res);
          if (Array.isArray(res)) {
            setVehicleModels(res);
          } else if (Array.isArray(res.data)) {
            setVehicleModels(res.data);
          } else {
            setVehicleModels([]);
          }
          setLoadingModels(false);
        })
        .catch(err => {
          setApiError('Failed to load models');
          setLoadingModels(false);
        });
    }
  }, [step]);

  const isLastStep = step === steps.length - 1;

  const handleNext = async (formik) => {
    const valid = await formik.validateForm();
    if (Object.keys(valid).length === 0) {
      setStep((s) => s + 1);
    } else {
      formik.setTouched(
        Object.keys(formik.values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );
    }
  };

  const handleBack = () => setStep((s) => s - 1);
  const handleReset = (resetForm) => {
    setStep(0);
    resetForm();
    setVehicleModels([]);
  };

  const handleSubmit = async (values, { resetForm, setFieldTouched }) => {
    console.log('Form submitted with values:', values);
    if (values.startDate && values.endDate) {
      const isValidRange = new Date(values.endDate) >= new Date(values.startDate);
      console.log(`End date is after or equal to start date: ${isValidRange}`);
      if (!isValidRange) {
        toast.error('End date cannot be before start date');
        return;
      }
    }
    setSubmitLoading(true);
    setApiError('');
    if (!values.startDate) setFieldTouched('startDate', true, false);
    if (!values.endDate) setFieldTouched('endDate', true, false);
    try {
      const selectedModel = vehicleModels.find(m => m.id === values.model);
      const vehicleId = selectedModel ? selectedModel.id : values.model;
      const response = await bookVehicle({
        firstName: values.firstName,
        lastName: values.lastName,
        vehicleId,
        startDate: values.startDate,
        endDate: values.endDate,
      });
      handleReset(resetForm);
      console.log('Finish function called');
      toast.success(response?.message || 'Booking successful!');
    } catch (err) {
      setApiError('Booking failed. Please try again.');
      toast.error(err?.response?.data?.message || 'Booking failed. Please try again.');
    }
    setSubmitLoading(false);
  };

  const renderStepContent = (stepIndex, formik) => {
    switch (stepIndex) {
      case 0:
        return <UserNameStep formik={formik} />;
      case 1:
        return <VehicleTypeStep formik={formik} vehicleTypes={vehicleTypeOptions} loading={false} />;
      case 2:
        return <VehicleSubTypeStep formik={formik} types={types} loading={loadingSubTypes} />;
      case 3:
        return <>
          <VehicleModelStep formik={formik} vehicleModels={vehicleModels} loading={loadingModels} />
          <BookingDateStep formik={formik} />
        </>;
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <div className="stepper-form-wrapper">
      <Box className="stepper-container">
        <ToastContainer position="top-right" autoClose={3000} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas[step]}
          validateOnChange={false}
          validateOnBlur={true}
          onSubmit={handleSubmit}
          innerRef={formikRef}
        >
          {(formik) => (
            <Form>
              <Stepper
                activeStep={step}
                alternativeLabel
                connector={<CustomConnector />}
                sx={{ mb: 4 }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <CustomStepLabel>{label}</CustomStepLabel>
                  </Step>
                ))}
              </Stepper>
              <div className="step-indicator">
                Step {step + 1} of {steps.length}
              </div>
              {apiError && <Typography color="error" sx={{ mb: 2 }}>{apiError}</Typography>}
              {renderStepContent(step, formik)}
              <div className="stepper-actions">
                <Button
                  disabled={step === 0 || submitLoading}
                  onClick={handleBack}
                  variant="outlined"
                  sx={{ color: '#333', borderColor: '#bdbdbd', background: '#f5f5f5', '&:hover': { background: '#e0e0e0', borderColor: '#888' } }}
                >
                  Back
                </Button>
                {!isLastStep ? (
                  <Button
                    onClick={() => handleNext(formik)}
                    variant="contained"
                    sx={{ background: '#43b672', '&:hover': { background: '#369a5a' } }}
                    disabled={
                      submitLoading ||
                      (step === 0 && (!formik.values.firstName || !formik.values.lastName)) ||
                      (step === 1 && !formik.values.vehicleType) ||
                      (step === 2 && !formik.values.type)
                    }
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={formik.handleSubmit}
                    variant="contained"
                    sx={{ background: '#43b672', '&:hover': { background: '#369a5a' } }}
                    disabled={
                      submitLoading ||
                      !formik.values.model ||
                      !formik.values.startDate ||
                      !formik.values.endDate
                    }
                  >
                    {submitLoading ? 'Booking...' : 'Finish & Book'}
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default StepperForm; 