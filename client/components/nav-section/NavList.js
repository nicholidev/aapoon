import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRouter } from 'next/router';
// @mui
import { List, Collapse } from '@mui/material';
//
import { NavItemRoot, NavItemSub } from './NavItem';

// ----------------------------------------------------------------------

const getActive = (path, pathname) => pathname.includes(path);

NavListRoot.propTypes = {
  isCollapse: PropTypes.bool,
  list: PropTypes.shape({
    children: PropTypes.array,
    path: PropTypes.string,
  }),
};

export function NavListRoot({ list, isCollapse }) {
  const { pathname } = useRouter();

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(active);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
        <NavItemRoot item={list} isCollapse={isCollapse} active={active} open={open} onOpen={() => setOpen(!open)} />

        {!isCollapse && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {(list.children || []).map((item) => (
                <NavListSub key={item.title} list={item} />
              ))}
            </List>
          </Collapse>
        )}
      </>
    );
  }

  return <NavItemRoot item={list} active={active} isCollapse={isCollapse} />;
}

// ----------------------------------------------------------------------

NavListSub.propTypes = {
  list: PropTypes.shape({
    children: PropTypes.array,
    path: PropTypes.string,
  }),
};

function NavListSub({ list }) {
  const { pathname } = useRouter();

  const activeRoot = getActive(list.path, pathname);

  const [open, setOpen] = useState(activeRoot);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
        <NavItemSub item={list} onOpen={() => setOpen(!open)} open={open} active={activeRoot} />

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 3 }}>
            {(list.children || []).map((item) => (
              <NavItemSub key={item.title} item={item} active={getActive(item.path, pathname)} />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return <NavItemSub item={list} active={activeRoot} />;
}
