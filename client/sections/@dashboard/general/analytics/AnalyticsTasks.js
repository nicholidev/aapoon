/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// @mui
import {
  Box,
  Card,
  Menu,
  Stack,
  Divider,
  Checkbox,
  MenuItem,
  IconButton,
  CardHeader,
  Typography,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const TASKS = [
  'Create FireStone Logo',
  'Add SCSS and JS files if required',
  'Stakeholder Meeting',
  'Scoping & Estimations',
  'Sprint Showcase',
];

// ----------------------------------------------------------------------

export default function AnalyticsTasks() {
  const formik = useFormik({
    initialValues: {
      checked: [TASKS[2]],
    },
    onSubmit: (values) => {
    },
  });

  const { values, handleSubmit, getFieldProps } = formik;

  const checkedProps = getFieldProps('checked');

  return (
    <Card>
      <CardHeader title="Tasks" />
      <Box sx={{ px: 3, py: 1 }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            {TASKS.map((task) => (
              <TaskItem key={task} task={task} checkedProps={checkedProps} checked={values.checked.includes(task)} />
            ))}
          </Form>
        </FormikProvider>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

TaskItem.propTypes = {
  task: PropTypes.string,
  checked: PropTypes.bool,
  checkedProps: PropTypes.object,
};

function TaskItem({ task, checked, checkedProps, ...other }) {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" sx={{ py: 0.75 }}>
        <FormControlLabel
          control={<Checkbox {...checkedProps} value={task} checked={checked} {...other} />}
          label={
            <Typography
              variant="body2"
              sx={{
                ...(checked && {
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }),
              }}
            >
              {task}
            </Typography>
          }
        />
        <MoreMenuButton />
      </Stack>
    </>
  );
}

// ----------------------------------------------------------------------

function MoreMenuButton() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton ref={anchorRef} size="large" onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <Menu
        open={open}
        anchorEl={anchorRef.current}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ borderRadius: 1 }}>
          <Iconify icon={'eva:checkmark-circle-2-fill'} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Mark Complete
          </Typography>
        </MenuItem>
        <MenuItem sx={{ borderRadius: 1 }}>
          <Iconify icon={'eva:edit-fill'} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Edit
          </Typography>
        </MenuItem>
        <MenuItem sx={{ borderRadius: 1 }}>
          <Iconify icon={'eva:share-fill'} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Share
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ color: 'error.main', borderRadius: 1 }}>
          <Iconify icon={'eva:trash-2-outline'} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
