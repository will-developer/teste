import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const SwipeableDrawerComponent: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const menuItems = [
    { text: t('aside.profile'), icon: <AccountCircleIcon />, href: '/perfil' },
    { text: t('aside.students'), icon: <PeopleIcon />, href: '/alunos' },
    { text: t('aside.evaluations'), icon: <RateReviewIcon />, href: '/avaliacoes' },
    { text: t('aside.grades'), icon: <AssignmentIcon />, href: '/notas' },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <Link href={item.href} passHref legacyBehavior>
              <ListItemButton component="a">
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {DrawerList}
      </SwipeableDrawer>
    </div>
  );
};

export default SwipeableDrawerComponent;
