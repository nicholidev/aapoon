/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { IconButtonAnimate } from '../../components/animate';
import { differenceInDays } from 'date-fns';
// @mui
import {
  Stack,
  Typography,
  DialogContent,
  Box,
  Dialog,
  Button,
  Divider,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import Iconify from '../../components/Iconify';
import moment from 'moment';
// components
import { useRouter } from 'next/router';
import { addTocalender } from '../../utils/addToCalender/AddToCalander';
import {removeMeeting} from '../../api/meeting'

function MeetingDetailsPopup(props) {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);

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

  const recudays = data?.extendedProps?.reccurring
    ? differenceInDays(
        new Date(data?.extendedProps.reccuringEndDate.seconds * 1000),
        new Date(data?.extendedProps.scheduledAt.seconds * 1000)
      )
    : false;

  const addCalender = (type) => {
    let event = {
      title: data.title,
      link: window.origin + '/meeting?meetingid=' + data?.id,
      location: '',
      startTime: new Date(data.start),
      endTime: new Date(data.end),
      password: data?.extendedProps?.password,
      description: data?.extendedProps?.description,
      recur: data?.extendedProps?.reccurring ? `RRULE:FREQ=DAILY;COUNT=${recudays + 1}` : '',
    };
    addTocalender(event, type, false);
  };

  // Remove Meeting Process
  const removeHandler = () => {
    removeMeeting(props.data?.['_def'].publicId)
    .then(() => {
      setConfirm(false);
      setOpen(false);
      router.reload();
    })
    
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
        <Dialog open={confirm} maxWidth={'xs'}>
          <DialogTitle id="alert-dialog-title">Are you sure remove this meeting?</DialogTitle>
          <DialogContent style={{ paddingBottom: '10px' }}>
          </DialogContent>
          <DialogActions style={{ paddingTop: '10px' }}>
            <Button
              onClick={() => {
                setConfirm(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={removeHandler}>
              Remove
            </Button>
          </DialogActions>
        </Dialog>
        <DialogContent>
          <div style={{ padding: '40px' }}>
            <Stack spacing={1} justifyContent="center">
              <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
                <Iconify icon="akar-icons:square-fill" color="success.main" />
                &nbsp;&nbsp;
                {data?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data?.extendedProps?.description}
              </Typography>
              {data?.extendedProps?.password && (
                <Typography variant="body">Meeting Password : {data?.extendedProps?.password}</Typography>
              )}

              <br />
              <Box display="flex" alignItems="center">
                <Iconify icon="ci:clock" width="20px" height="20px" color="text.secondary" /> &nbsp;&nbsp;
                <Typography variant="body2">
                  {moment(new Date(data?.start)).format('LLL')}&nbsp;<span style={{ fontWeight: 700 }}> To </span>&nbsp;
                  {data?.extendedProps?.reccurring
                    ? moment(new Date(data?.extendedProps.reccuringEndDate.seconds * 1000)).format('LLL')
                    : moment(new Date(data?.end)).format('LLL')}
                </Typography>
              </Box>
              {data?.extendedProps?.reccurring && (
                <Typography variant="caption">
                  Reccuring ( {moment(new Date(data?.start)).format('LT')} - {moment(new Date(data?.end)).format('LT')}{' '}
                  )
                </Typography>
              )}
              <Box display={'flex'} style={{ marginTop: '16px' }}>
                <Button
                  variant="outlined"
                  onClick={() => router.push(window.origin + '/meeting?meetingid=' + data?.id)}
                >
                  <img src="/favicon/favicon-32x32.png" />
                  &nbsp;&nbsp; Join Aapoon Meeting
                </Button>
              </Box>
              <Divider style={{ margin: '16px 0 8px' }} />
              <Box display="flex">
                <Iconify icon="fluent:text-description-24-filled" width="24px" height="24px" color="text.secondary" />{' '}
                &nbsp;&nbsp;
                <Typography variant="body2">{data?.extendedProps?.description || 'N/A'}</Typography>
              </Box>
              <Divider style={{ margin: '16px 0 8px' }} />
              <Box display="flex" alignItems={'center'}>
                <Iconify icon="akar-icons:link-chain" width="24px" height="24px" color="text.secondary" /> &nbsp;&nbsp;
                <Typography variant="body2">{window.origin + '/meeting?meetingid=' + data?.id}</Typography>&nbsp;&nbsp;
                <Button
                  onClick={() => copyTocb(window.origin + '/meeting?meetingid=' + data?.id)}
                  endIcon={<Iconify icon="lucide:copy" />}
                >
                  Copy
                </Button>
              </Box>
              <Divider style={{ margin: '16px 0 8px' }} />

              <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex' }} gutterBottom>
                Add To Calander
              </Typography>

              <Stack spacing={2} direction={'column'}>
                <Box display={'flex'} alignItems="center" justifyContent="space-between">
                  <Box display={'flex'} alignItems="center">
                    <Iconify icon="ant-design:apple-filled" sx={{ fontSize: 24, color: '#000' }} />
                    &nbsp;&nbsp;
                    <Typography variant="subtitle2">Apple Calendar</Typography>
                  </Box>
                  <Button onClick={() => addCalender('apple')}>
                    Download&nbsp;&nbsp;
                    <Iconify icon="heroicons-outline:download" sx={{ fontSize: 24 }} />
                  </Button>
                </Box>
                <Box display={'flex'} alignItems="center" justifyContent="space-between">
                  <Box display={'flex'} alignItems="center">
                    <Iconify icon="vscode-icons:file-type-outlook" sx={{ fontSize: 24, color: '#225082' }} />
                    &nbsp;&nbsp;
                    <Typography variant="subtitle2">Outlook Web</Typography>
                  </Box>
                  <Button onClick={() => addCalender('outlookcom')}>
                    Download&nbsp;&nbsp;
                    <Iconify icon="heroicons-outline:download" sx={{ fontSize: 24 }} />
                  </Button>
                </Box>{' '}
                <Box display={'flex'} alignItems="center" justifyContent="space-between">
                  <Box display={'flex'} alignItems="center">
                    <Iconify icon="vscode-icons:file-type-outlook" sx={{ fontSize: 24, color: '#225082' }} />
                    &nbsp;&nbsp;
                    <Typography variant="subtitle2">Outlook Client</Typography>
                  </Box>
                  <Button onClick={() => addCalender('apple')}>
                    Download&nbsp;&nbsp;
                    <Iconify icon="heroicons-outline:download" sx={{ fontSize: 24 }} />
                  </Button>
                </Box>{' '}
                <Box display={'flex'} alignItems="center" justifyContent="space-between">
                  <Box display={'flex'} alignItems="center">
                    <Iconify icon="flat-color-icons:google" sx={{ fontSize: 24, color: '#225082' }} />
                    &nbsp;&nbsp;
                    <Typography variant="subtitle2">Google Calendar</Typography>
                  </Box>
                  <Button onClick={() => addCalender('google')}>
                    Download&nbsp;&nbsp;
                    <Iconify icon="heroicons-outline:download" sx={{ fontSize: 24 }} />
                  </Button>
                </Box>
              </Stack>

              <Divider style={{ margin: '16px 0 8px' }} />
              <Box display={'flex'} style={{ marginTop: '16px' }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setConfirm(true);
                  }}
                >
                  Remove Meeting
                </Button>
              </Box>
            </Stack>
          </div>
        </DialogContent>
      </Dialog>
      <div onClick={() => setOpen(true)}>{props.children}</div>
    </div>
  );
}

export default MeetingDetailsPopup;
