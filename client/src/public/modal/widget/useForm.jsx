import { useState } from 'react';

const useForm = (initialValues) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    let errors = {};
    
    if (!formValues.firstName) errors.firstName = 'First name is required';
    if (!formValues.lastName) errors.lastName = 'Last name is required';
    if (!formValues.matrikNumber) errors.matrikNumber = 'Matrik Number is required';
    if (!formValues.academicYear) errors.academicYear = 'Academic Year is required';
    if (!formValues.phoneNumber) errors.phoneNumber = 'Phone Number is required';
    if (!formValues.dateOfBirth) errors.dateOfBirth = 'Date Of Birth is required';
    if (!formValues.address) errors.address = 'Address is required';
    if (!formValues.city) errors.city = 'City is required';
    if (!formValues.state) errors.state = 'State is required';
    if (!formValues.zip) errors.zip = 'Zip / Postal code is required';
    if (!formValues.country) errors.country = 'Country is required';

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e, callback) => {
    if (e && e.preventDefault) e.preventDefault();
    const isValid = validate();
    if (isValid && callback) {
      callback();
    }
  };

  return {
    formValues,
    formErrors,
    handleInputChange,
    handleSubmit,
  };
};

export default useForm;
