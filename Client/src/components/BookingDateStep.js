import React, { useEffect } from 'react';
import { Box, TextField, Typography, InputAdornment } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const BookingDateStep = ({ formik }) => {
  // Force touch on submit if errors exist
  useEffect(() => {
    if (formik.submitCount > 0) {
      if (formik.errors.startDate && !formik.touched.startDate) {
        formik.setFieldTouched('startDate', true, false);
      }
      if (formik.errors.endDate && !formik.touched.endDate) {
        formik.setFieldTouched('endDate', true, false);
      }
    }
    // eslint-disable-next-line
  }, [formik.submitCount]);

  const showStartError = (formik.touched.startDate || formik.submitCount > 0) && Boolean(formik.errors.startDate);
  const showEndError = (formik.touched.endDate || formik.submitCount > 0) && Boolean(formik.errors.endDate);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ flexDirection: 'column', gap: 1, mt: 2, mb: 1 }}>
        <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 500, color: '#3a3a3a', ml: 0.5 }}>
          Booking Date Range
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 3 },
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            mx: 'auto',
            p: 0,
            borderRadius: 3,
            mb: 1.5,
          }}
        >
          <Box sx={{ flex: 1, width: '100%', '& .MuiFormControl-root.MuiPickersTextField-root': { minWidth: '100%', boxShadow: 'none', p: 0 } }}>
            <DatePicker
              label="Start Date"
              value={formik.values.startDate}
              onChange={(date) => formik.setFieldValue('startDate', date)}
              onBlur={formik.handleBlur}
              componentsProps={{
                textField: {
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthIcon color="primary" />
                      </InputAdornment>
                    ),
                    sx: { fontSize: '1.1rem', borderRadius: 2, background: 'transparent' },
                  },
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="startDate"
                  fullWidth
                  error={showStartError}
                  helperText={showStartError ? formik.errors.startDate : ''}
                  required
                />
              )}
            />
          </Box>
          <Box sx={{ flex: 1, width: '100%', '& .MuiFormControl-root.MuiPickersTextField-root': { minWidth: '100%', boxShadow: 'none', p: 0 } }}>
            <DatePicker
              label="End Date"
              value={formik.values.endDate}
              onChange={(date) => formik.setFieldValue('endDate', date)}
              onBlur={formik.handleBlur}
              componentsProps={{
                textField: {
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthIcon color="primary" />
                      </InputAdornment>
                    ),
                    sx: { fontSize: '1.1rem', borderRadius: 2, background: 'transparent' },
                  },
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="endDate"
                  fullWidth
                  error={showEndError}
                  helperText={showEndError ? formik.errors.endDate : ''}
                  required
                />
              )}
            />
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default BookingDateStep; 