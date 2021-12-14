import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Paper, Typography, CardActionArea } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionInView, varFade, varHover, varTranHover } from '../../components/animate';

// ----------------------------------------------------------------------

ComponentCard.propTypes = {
  item: PropTypes.shape({
    href: PropTypes.string,
    icon: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default function ComponentCard({ item }) {
  const { name, icon, href } = item;

  return (
    <MotionInView variants={varFade().inUp}>
      <Link component={RouterLink} to={href} underline="none">
        <Paper variant="outlined" sx={{ p: 1 }}>
          <CardActionArea
            component={m.div}
            whileHover="hover"
            sx={{
              p: 3,
              borderRadius: 1,
              color: 'primary.main',
              bgcolor: 'background.neutral',
            }}
          >
            <m.div variants={varHover(1.2)} transition={varTranHover()}>
              <Image src={icon} alt={name} effect="black-and-white" />
            </m.div>
          </CardActionArea>

          <Typography variant="subtitle2" sx={{ mt: 1, p: 1 }}>
            {name}
          </Typography>
        </Paper>
      </Link>
    </MotionInView>
  );
}
