import React from 'react';
import { Box, Grid, FormControlLabel, Checkbox, FormLabel, OutlinedInput } from '@mui/material';
import styled from '@mui/material/styles/styled';
import ButtonComponent from './useButton';
import useForm from './useForm';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const ModalFormComponent = (props) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    matrikNumber: '',
    academicYear: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    saveAddress: false,
  };

  const {
    formValues,
    formErrors,
    handleInputChange,
    handleSubmit,
  } = useForm(initialValues);

  return (
    <>
      <Box sx={{ width: '90%', height: '75%', overflow: 'hidden', overflowY: 'scroll' }} className="mt-8 my-4 px-8 px-8 max-md:px-2  scrollbar-hide">
        <Grid container spacing={3}>
          {[
            { id: 'first-name', name: 'firstName', label: 'First name', placeholder: 'John' },
            { id: 'lastName', name: 'lastName', label: 'Last name', placeholder: 'Snow' },
            { id: 'matrikNumber', name: 'matrikNumber', label: 'Matrik Number', placeholder: 'A22EC1234' },
            { id: 'academicYear', name: 'academicYear', label: 'Academic Year', placeholder: 'Year 2' },
            { id: 'phoneNumber', name: 'phoneNumber', label: 'Phone Number', placeholder: '60123456789' },
            { id: 'dateOfBirth', name: 'dateOfBirth', label: 'Date Of Birth', placeholder: '26/08/2003' },
            { id: 'address', name: 'address', label: 'Address', placeholder: 'Apartment, suite, unit, etc. (optional)' },
            { id: 'city', name: 'city', label: 'City', placeholder: 'New York' },
            { id: 'state', name: 'state', label: 'State', placeholder: 'NY' },
            { id: 'zip', name: 'zip', label: 'Zip / Postal code', placeholder: '12345' },
            { id: 'country', name: 'country', label: 'Country', placeholder: 'United States' },
          ].map(field => (
            <FormGrid key={field.id} item xs={12} md={6}>
              <FormLabel htmlFor={field.id} required>{field.label}</FormLabel>
              <OutlinedInput
                id={field.id}
                name={field.name}
                type="text"
                placeholder={field.placeholder}
                autoComplete={field.name}
                required
                color="indigo"
                value={formValues[field.name]}
                onChange={handleInputChange}
                error={Boolean(formErrors[field.name])}
              />
              {formErrors[field.name] && (
                <p style={{ color: 'red', fontSize: '12px' }}>{formErrors[field.name]}</p>
              )}
            </FormGrid>
          ))}
          <FormGrid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="indigo" name="saveAddress" checked={formValues.saveAddress} onChange={handleInputChange} />}
              label="Use this address for event details"
            />
          </FormGrid>
        </Grid>
      </Box>
      <ButtonComponent setStep={props.setStep} handleSubmit={(e) => handleSubmit(e, () => props.setStep(2))} prev={0} next={2} />
    </>
  );
};

export default ModalFormComponent;
