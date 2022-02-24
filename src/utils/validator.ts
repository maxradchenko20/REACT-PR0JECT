import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().min(2, 'min 2').max(40, 'max 40').required('required'),
  username: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  website: yup.string().required('required')
});
