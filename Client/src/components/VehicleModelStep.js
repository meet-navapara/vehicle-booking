import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, FormHelperText, CircularProgress } from '@mui/material';

const VehicleModelStep = ({ formik, vehicleModels = [], loading }) => {
  const showError = (formik.touched.model || formik.submitCount > 0) && Boolean(formik.errors.model);
  return (
    <Box sx={{ mt: 3 }}>
      <FormControl fullWidth required error={showError}>
        <InputLabel id="model-label">Model</InputLabel>
        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 56, pl: 2 }}>
            <CircularProgress size={28} />
            <span style={{ marginLeft: 16 }}>Loading models...</span>
          </Box>
        ) : (
          <Select
            labelId="model-label"
            name="model"
            value={formik.values.model}
            label="Model"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={!formik.values.vehicleType}
          >
            <MenuItem value="" disabled>Select a model</MenuItem>
            {vehicleModels.map((m) => {
              if (typeof m === 'object' && m !== null) {
                return (
                  <MenuItem key={m.id} value={m.id}>
                    {m.model || m.name || m.id}
                  </MenuItem>
                );
              } else {
                return (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                );
              }
            })}
          </Select>
        )}
        {showError && (
          <FormHelperText>{formik.errors.model}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default VehicleModelStep; 