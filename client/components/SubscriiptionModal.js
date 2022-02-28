/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCollection } from '@nandorojo/swr-firestore';
import { openCustomerPortal } from '../api/payments';
import useAuth from './../hooks/useAuth';
export default function AlertDialog() {
  const [open, setOpen] = React.useState(true);
  const { user, setLoading } = useAuth();
  const { data: subData } = useCollection(user.id ? `customers/${user.id}/subscriptions` : null, {
    where: [['status', '==', 'past_due']],
    listen: true,
  });

  const { data: invoiceData } = useCollection(
    subData?.length ? `customers/${user.id}/subscriptions/${subData[0].id}/invoices` : null,
    {
      orderBy: 'created',
      limit: 1,
    }
  );
  const openRenew = () => {
    window.location = invoiceData[0].hosted_invoice_url;
  };

  const cancelSubscription = () => {
    setLoading(true);
    openCustomerPortal().then((url) => {
      setLoading(false);
      window.location = url + '/subscriptions/' + subData[0].id + '/cancel';
    });
  };
  return (
    <div>
      <Dialog
        open={subData?.length ? true : false}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Your subscription is expired.'}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mt: 2 }} id="alert-dialog-description">
            Your current subscription is expired or have an unpaid invoice, click on renew or cancel subscription.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant="contained" onClick={openRenew}>
            Renew subscription
          </Button>
          <Button fullWidth variant="outlined" onClick={cancelSubscription}>
            cancel subscription
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
