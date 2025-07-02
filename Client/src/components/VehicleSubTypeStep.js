import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box, FormHelperText, CircularProgress } from '@mui/material';

const VehicleSubTypeStep = ({ formik, types = [], loading, onTypeChange }) => {
  const handleChange = (e) => {
    formik.handleChange(e);
    formik.setFieldValue('model', '');
    if (onTypeChange) {
      onTypeChange(e.target.value);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <FormControl component="fieldset" error={formik.touched.type && Boolean(formik.errors.type)} required>
        <FormLabel component="legend">Select Type</FormLabel>
        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 56 }}>
            <CircularProgress size={28} />
            <span style={{ marginLeft: 16 }}>Loading types...</span>
          </Box>
        ) : (
          <RadioGroup
            row
            name="type"
            value={formik.values.type}
            onChange={handleChange}
            onBlur={formik.handleBlur}
          >
            {types.map((type) => (
              <FormControlLabel
                key={type.id}
                value={type.id}
                control={<Radio />}
                label={type.name || type.type || type.id}
              />
            ))}
          </RadioGroup>
        )}
        {formik.touched.type && formik.errors.type && (
          <FormHelperText>{formik.errors.type}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default VehicleSubTypeStep; 