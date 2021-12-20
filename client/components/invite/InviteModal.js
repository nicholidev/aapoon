/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { inviteUser } from '../../api/user';
import { LoadingButton } from '@mui/lab';
import useAuth from '../../hooks/useAuth';
export default function InviteModal(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { user } = useAuth();
  const schema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
  });
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      invitedBy: user.id,
    },
    validationSchema: schema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        await inviteUser({ ...values, invitedBy: user.id });
        enqueueSnackbar('User Invited');
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
        resetForm();
      }
    },
  });
  console.log(user.id);
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Invite a User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <TextField
                name="firstName"
                fullWidth
                label="First Name"
                variant="outlined"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="lastName"
                fullWidth
                label="Last Name"
                variant="outlined"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField name="email" fullWidth label="Email" variant="outlined" onChange={formik.handleChange} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <LoadingButton fullWidth type="submit" variant="contained" loading={isSubmitting} color="primary">
            Invite
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
