/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import {useState} from "react";
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// @mui
import {
  Dialog,
  TextField,
  Alert,
  Stack,
  Typography,
  ButtonBase,
  Box,
  DialogTitle,

} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/Iconify';

import { IconButtonAnimate } from '../../components/animate';
import { instantMeeting } from '../../api/meeting';
// ----------------------------------------------------------------------
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
function InstantMeetingPopup(props) {
  const [open, setOpen] = useState(false)
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const RegisterSchema = Yup.object().shape({
    meetingDescription: Yup.string().min(5, 'description is too Short!'),
  });

  const formik = useFormik({
    initialValues: {
      meetingDescription: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      try {
        let meetingData = await instantMeeting({ description: values.meetingDescription });

        enqueueSnackbar('New meeting created', {
          variant: 'success',
          action: (key) => (
            <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
              <Iconify icon={'eva:close-fill'} />
            </IconButtonAnimate>
          ),
        });

        setSubmitting(false);
        setOpen(false);
        resetForm();
        // window.open('https://meet.aapoon.com/' + meetingData.data.id);
        router.push(`/meeting?meetingid=${meetingData.data.id}`);
      } catch (error) {
        enqueueSnackbar('Error in creating meeting', {
          variant: 'error',
          action: (key) => (
            <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
              <Iconify icon={'eva:close-fill'} />
            </IconButtonAnimate>
          ),
        });
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps} = formik;

  return (
    <>
      <Dialog open={open} maxWidth={'xs'} fullWidth onClose={() => setOpen(false)}>
        <DialogTitle id="alert-dialog-title" align="center" sx={{display: 'flex',justifyContent:"space-between",alignItems: 'center'}}>
            <span>&nbsp; &nbsp; &nbsp; &nbsp;</span>
            <Typography variant="span" align="center" gutterBottom>
              Instant Meeting
            </Typography> <IconButtonAnimate onClick={()=>setOpen(false)}><CancelOutlinedIcon/></IconButtonAnimate>
        </DialogTitle>
        <div style={{ padding: '40px' ,paddingTop:24}}>
          <br />
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={6}>
                {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

                <Stack spacing={1}>
                  <Typography sx={{ fontWeight: 500, display: 'flex' }}>Meeting Description</Typography>
                  <TextField
                    fullWidth
                    // placeholder="Type meeting description"
                    {...getFieldProps('meetingDescription')}
                    error={Boolean(touched.meetingDescription && errors.meetingDescription)}
                    helperText={touched.meetingDescription && errors.meetingDescription}
                  />
                </Stack>

                <Stack
                  justifyContent={'center'}
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 1, sm: 2, md: 2 }}
                >
                  <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Start Meeting
                  </LoadingButton>
                </Stack>

                <br />
                <br />
              </Stack>
            </Form>
          </FormikProvider>
        </div>
      </Dialog>
      {props.noButton ? (
        <div onClick={() => setOpen(true)}>{props.children}</div>
      ) : (
        <div style={{display: 'inline-block'}} onClick={() => setOpen(true)}>
          {props.children}
        </div>
      )}
    </>
  );
}

export default InstantMeetingPopup;
