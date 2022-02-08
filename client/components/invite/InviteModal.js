/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { inviteUser } from '../../api/user';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
export default function InviteModal(props) {
  const [linkSent, setLinkSent] = useState(false);
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
        enqueueSnackbar('User Invited', {
          variant: 'success',
        });
        setSubmitting(false);
        setLinkSent(true);
      } catch (error) {
        setSubmitting(false);
        console.log(error.response.data);
        if (error.response && error.response.data?.message) setErrors({ email: error.response.data?.message });
      }
    },
  });
  console.log(user.id);
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Dialog
      open={props.open}
      onClose={() => {
        props.handleClose();
        setLinkSent(false);
      }}
    >
      {!linkSent ? (
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
                <TextField
                  name="email"
                  fullWidth
                  label="Email"
                  variant="outlined"
                  onChange={formik.handleChange}
                  error={errors.email !== undefined ? true : false}
                  helperText={errors.email}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <LoadingButton fullWidth type="submit" variant="contained" loading={isSubmitting} color="primary">
              Invite
            </LoadingButton>
          </DialogActions>
        </form>
      ) : (
        <Box
          sx={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            padding: 4,
            flexDirection: 'column',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Link Sent
          </Typography>
          <br />
          <img src="/images/help/check.png" width="100" />
          <br />
          <br />

          <Typography sx={{ maxWidth: 380 }}>
            You have invited {values.email}, A link has been sent to the user to accept and join.
          </Typography>
        </Box>
      )}
    </Dialog>
  );
}
