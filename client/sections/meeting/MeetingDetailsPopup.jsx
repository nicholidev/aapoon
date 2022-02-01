/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import { IconButtonAnimate } from '../../components/animate';
// @mui
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  ButtonBase,
  Typography,
  Grid,
  Select,
  MenuItem,
  Box,
  Dialog,
  FormHelperText,
  Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../components/Iconify';
import moment from 'moment';
// components
import { useRouter } from 'next/router';
import { addTocalender } from '../../utils/addToCalender/AddToCalander';

function MeetingDetailsPopup(props) {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const [data, setData] = useState({});
  useEffect(() => {
    setOpen(props.isOpen);
    setData(props.data);
  }, [props.isOpen]);

  const copyTocb = (data) => {
    navigator.clipboard.writeText(data);
    enqueueSnackbar('Meeting link copied to clipboard', {
      variant: 'success',
      action: (key) => (
        <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
          <Iconify icon={'eva:close-fill'} />
        </IconButtonAnimate>
      ),
    });
  };

  const addCalender = (type) => {
    let event = {
      title: data.title,
      description: data.description,
      location: '',
      startTime: new Date(data.start),
      endTime: new Date(data.end),
    };
    addTocalender(event, type, false);
  };

  return (
    <div>
      <Dialog
        open={open}
        maxWidth={'sm'}
        fullWidth
        onClose={() => {
          setOpen(false);
          props.onClose();
        }}
      >
        <div style={{ padding: '40px' }}>
          <Stack spacing={1} justifyContent="center" alignItems="center">
            <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
              {data?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data?.extendedProps?.description}
            </Typography>
            {data?.extendedProps?.password && (
              <Typography variant="body">Meeting Password : {data?.extendedProps.password}</Typography>
            )}

            <br />
            <Typography variant="body2">
              {moment(new Date(data?.start)).format('LLL')}&nbsp;<span style={{ fontWeight: 700 }}>To</span>&nbsp;
              {moment(new Date(data?.end)).format('LLL')}
            </Typography>
            <Box
              component={ButtonBase}
              onClick={() => copyTocb(window.origin + '/meeting?meetingid=' + data?.id)}
              sx={{
                border: '1px solid #DDDDDD',
                borderRadius: 1,
                padding: 1,
                pl: 2,
                pr: 2,
                backgroundColor: '#F9F9F9',
                mb: 4,
              }}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                variant="subtitle2"
                align="center"
                sx={{ fontWeight: 500, display: 'flex', justifyContent: 'center' }}
              >
                {window.origin + '/meeting?meetingid=' + data?.id}
              </Typography>
              <Iconify icon="fluent:copy-20-filled" sx={{ fontSize: 24, ml: 2, color: 'text.secondary' }} />
            </Box>
            <br />
            <Button variant="outlined" onClick={() => router.push(window.origin + '/meeting?meetingid=' + data?.id)}>
              <Typography variant="h6">Join Now</Typography>
            </Button>
            <br />
            <Typography sx={{ fontWeight: 500, display: 'flex' }} variant="body" gutterBottom>
              Add To Calander
            </Typography>

            <Stack
              spacing={2}
              direction={{ xs: 'column', sm: 'row', mt: 1 }}
              justifyContent="center"
              alignItems="center"
            >
              <Box
                component={ButtonBase}
                onClick={() => addCalender('apple')}
                width="160px"
                sx={{ border: '1px solid #DDDDDD', borderRadius: 1, padding: 2, backgroundColor: '#F9F9F9' }}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Iconify icon="ant-design:apple-filled" sx={{ fontSize: 40, color: '#000' }} />
                <Typography
                  variant="subtitle2"
                  align="center"
                  sx={{ fontWeight: 500, display: 'flex', justifyContent: 'center', mt: 1 }}
                >
                  Apple calendar
                </Typography>
              </Box>
              <Box
                component={ButtonBase}
                onClick={() => addCalender('outlookcom')}
                width="160px"
                sx={{ border: '1px solid #DDDDDD', borderRadius: 1, padding: 2, backgroundColor: '#F9F9F9' }}
                display="flex"
                teamsize
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Iconify icon="vscode-icons:file-type-outlook" sx={{ fontSize: 40, color: '#225082' }} />

                <Typography
                  variant="subtitle2"
                  align="center"
                  sx={{ fontWeight: 500, display: 'flex', justifyContent: 'center', mt: 1 }}
                >
                  Outlook calendar
                </Typography>
              </Box>
              <Box
                component={ButtonBase}
                width="160px"
                sx={{ border: '1px solid #DDDDDD', borderRadius: 1, padding: 2, backgroundColor: '#F9F9F9' }}
                display="flex"
                onClick={() => addCalender('google')}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Iconify icon="flat-color-icons:google" sx={{ fontSize: 40, color: '#225082' }} />

                <Typography
                  variant="subtitle2"
                  align="center"
                  sx={{ fontWeight: 500, display: 'flex', justifyContent: 'center', mt: 1 }}
                >
                  Google calendar
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </div>
      </Dialog>
      <div onClick={() => setOpen(true)}>{props.children}</div>
    </div>
  );
}

export default MeetingDetailsPopup;
