import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box, FormHelperText, CircularProgress } from '@mui/material';

const VehicleTypeStep = ({ formik, vehicleTypes = [], loading, onVehicleTypeChange }) => {
  const handleChange = (e) => {
    formik.handleChange(e);
    formik.setFieldValue('model', '');
    if (onVehicleTypeChange) {
      onVehicleTypeChange(e.target.value);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <FormControl component="fieldset" error={formik.touched.vehicleType && Boolean(formik.errors.vehicleType)} required>
        <FormLabel component="legend">Vehicle Type</FormLabel>
        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 56 }}>
            <CircularProgress size={28} />
            <span style={{ marginLeft: 16 }}>Loading vehicle types...</span>
          </Box>
        ) : (
          <RadioGroup
            row
            name="vehicleType"
            value={formik.values.vehicleType}
            onChange={handleChange}
            onBlur={formik.handleBlur}
          >
            {vehicleTypes.map((type) => (
              <FormControlLabel
                key={type.wheels}
                value={type.wheels}
                control={<Radio />}
                label={type.wheels === '2_wheels' ? '2 Wheels' : '4 Wheels'}
              />
            ))}
          </RadioGroup>
        )}
        {formik.touched.vehicleType && formik.errors.vehicleType && (
          <FormHelperText>{formik.errors.vehicleType}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default VehicleTypeStep; 