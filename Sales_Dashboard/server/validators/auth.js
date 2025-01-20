export const validateLogin = (data) => {
  const errors = {};

  // Phone validation
  if (!data.phone_no) {
    errors.phone_no = "Phone number is required";
  } else if (!/^\d{11}$/.test(data.phone_no)) {
    errors.phone_no = "Invalid phone number format";
  }

  // Password validation
  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 4) {
    errors.password = "Password must be at least 4 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
