import React from 'react';
import { TextField, Box } from '@mui/material';

const UserNameStep = ({ formik }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mt: 3 }}>
      <TextField
        label="First Name"
        name="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
        fullWidth
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
        required
        sx={{ fontSize: '1.1rem' }}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
        fullWidth
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
        required
        sx={{ fontSize: '1.1rem' }}
      />
    </Box>
  );
};

export default UserNameStep; 