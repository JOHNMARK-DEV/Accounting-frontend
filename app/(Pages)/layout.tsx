"use client"
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PaymentsIcon from '@mui/icons-material/Payments';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import SearchIcon from '@mui/icons-material/Search';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ExpandLess, ExpandMore, Height, StarBorder } from '@mui/icons-material';
import { Breadcrumbs, Card, Collapse, Link } from '@mui/material';
import Paper from '@mui/material/Paper';
import { getRoutePath } from './routes'
const inter = Inter({ subsets: ['latin'] })

import { useRouter } from 'next/navigation'; 
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const breadcrumbs = [

    <Link underline="hover" key="1" color="white" href="/"  >
        Company
    </Link>,
    // <Link
    //     underline="hover"
    //     key="2"
    //     color="white"
    //     href="/material-ui/getting-started/installation/"

    // >
    //     Core
    // </Link>,
    // <Typography key="3" color="white">
    //     Breadcrumb
    // </Typography>,
];

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openSetupList, setSetupList] = React.useState(false);

    const handleClickSetupList = () => {
        setSetupList(!openSetupList);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const router = useRouter()
    const handleRoutes = (target: string) => {
        router.push(getRoutePath(target));
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box>
                        <Typography variant="h6" noWrap component="div">
                            Company
                        </Typography>
                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="small" sx={{ color: 'white' }} />}
                            aria-label="breadcrumb"
                        >
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 1 }} onClick={() => handleRoutes("Dashboard")}> s
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 1 }}>
                        <ListItemIcon>
                            <ReceiptIcon />
                        </ListItemIcon>
                        <ListItemText primary="Invoicing" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 1 }}>
                        <ListItemIcon>
                            <PointOfSaleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Official Receipt" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 1 }}>
                        <ListItemIcon>
                            <ShoppingBagIcon />
                        </ListItemIcon>
                        <ListItemText primary="Accounts Payable Voucher" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 1 }}>
                        <ListItemIcon>
                            <PaymentsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Check Voucher" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 1 }}>
                        <ListItemIcon>
                            <LibraryBooksIcon />
                        </ListItemIcon>
                        <ListItemText primary="Journal Voucher" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 1 }}>
                        <ListItemIcon>
                            <BrokenImageIcon />
                        </ListItemIcon>
                        <ListItemText primary="Debit / Credit memo" className='text-9xl' />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 1 }}>
                        <ListItemIcon>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText primary="Transaction Viewer" />
                    </ListItemButton>
                </List>
                <Divider />
                <Box>
                    <ListItemButton sx={{ pl: 1 }}
                        onClick={handleClickSetupList}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="System Configuration" />
                        {openSetupList ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openSetupList} timeout="auto" unmountOnExit>

                        {/* COMPANY */}
                        <List>

                            <ListItemButton sx={{ pl: 2, py: 0 }} onClick={() => handleRoutes("CompanySetup")}>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Company Setup" />
                            </ListItemButton>
                        </List>

                        {/* CURRENCY */}
                        <List>

                            <ListItemButton sx={{ pl: 2, py: 0 }} onClick={() => handleRoutes("CurrencySetup")}>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Currency Setup" />
                            </ListItemButton>
                        </List>

                        <Box>
                            <ListItemButton
                                onClick={handleClickSetupList}>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Account Management" />
                                {openSetupList ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={!openSetupList} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 3 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primary="Starred" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </Box>

                        <Box>
                            <ListItemButton
                                onClick={handleClickSetupList}>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Book" />
                                {openSetupList ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={!openSetupList} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 3 }}>
                                        <ListItemIcon>
                                            <SettingsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Starred" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </Box>

                        <Box>
                            <ListItemButton
                                onClick={handleClickSetupList}>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Chart" />
                                {openSetupList ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={!openSetupList} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 3 }}>
                                        <ListItemIcon>
                                            <SettingsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Starred" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </Box>

                        <Box>
                            <ListItemButton
                                onClick={handleClickSetupList}>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Tax" />
                                {openSetupList ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={!openSetupList} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 3 }}>
                                        <ListItemIcon>
                                            <SettingsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Starred" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </Box>

                        <Box>
                            <ListItemButton
                                onClick={handleClickSetupList}>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="More Setup" />
                                {openSetupList ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={!openSetupList} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 3 }}>
                                        <ListItemIcon>
                                            <SettingsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Starred" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </Box>
                    </Collapse>
                </Box>
                <Divider />
                <Box>
                    <ListItemButton sx={{ pl: 1 }}
                        onClick={handleClickSetupList}>
                        <ListItemIcon>
                            <LineAxisIcon />
                        </ListItemIcon>
                        <ListItemText primary="Reports" />
                        {openSetupList ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </Box>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Card sx={{ height: '80vh', width: '80vw', margin: 'auto', padding: '20px' }}>
                    {children}
                </Card>
            </Main>
        </Box>
    );
}