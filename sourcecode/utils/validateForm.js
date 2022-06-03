function validate (toValidate, value) {

  return !toValidate.filter(validation => {
    if (validation === 'required') {
      return validateRequired(value);
    } else if (validation === 'email') {
      return validateEmail(value);
    } else if (validation === 'phone') {
      return validatePhone(value);
    }

  }).size;
}

function validateRequired (value) {
  return !value;
}

function validateEmail (value) {
  value = value.replace(/\s/g, '');
  const emailRegexp = `^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)
  *\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$`.replace(/\s/g, '');
  const pattern = new RegExp(emailRegexp, 'i');

  return !pattern.test(value);
}

function validatePhone (value) {
  value = value.replace(/\s/g, '');
  const pattern = new RegExp(`^$|[^0-9-+().]+`, 'i');

  return pattern.test(value);
}

export default validate;
