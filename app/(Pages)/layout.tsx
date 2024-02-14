"use client"
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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
import { Avatar, Badge, Breadcrumbs, Button, Card, Collapse, Link, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import TaskIcon from '@mui/icons-material/Task';
import Paper from '@mui/material/Paper';
import { getRoutePath } from './routes'
import { LocalizationProvider } from "@mui/x-date-pickers";
const inter = Inter({ subsets: ['latin'] })
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useStore from "@/store/store";
import { useRouter } from 'next/navigation';
import { UseSetupList, UseAccountingManagementNav } from '@/components/Static/Navitems';
import useChooseBookModal from '@/components/Modals/useChooseBookModal';
const drawerWidth = 250;




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
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openAccountSettings = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [Book, setBook] = React.useState(false);
    const [module, setModule] = React.useState("Dashboard");
    const [ToggleCollapse, setToggleCollapse] = React.useState(0);
    const [ChildToggleCollapse, setChildToggleCollapse] = React.useState(0);


    const [CollapseIndexState, setCollapseIndexState] = React.useState(0);
    const [CollapseChildIndexState, setCollapseChildIndexState] = React.useState(0);

    const {
        SelectedBook
    }: any = useStore()

    const handleClickToggle = (index: number = 0) => {

        if (CollapseIndexState != index) {
            setCollapseIndexState(() => index)
            setToggleCollapse(() => index)
        } else {
            setCollapseIndexState(() => 0)
            setToggleCollapse(0);
        }
    };
    const handleClickChildToggle = (index: number = 0) => {

        if (CollapseChildIndexState != index) {
            setCollapseChildIndexState(() => index)
            setChildToggleCollapse(() => index)
        } else {
            setCollapseChildIndexState(() => 0)
            setChildToggleCollapse(0);
        }
    };


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const router = useRouter()

    const handleRoutes = (target: string) => {
        router.push(target);
        setModule(() => target);
    }
    const AccountingManagementList = UseAccountingManagementNav;
    const ToggleBookModal = () => {
        setBook(!Book)
    }
    const chooseBookModal = useChooseBookModal(ToggleBookModal);


    return (
        <Box sx={{ display: 'flex', backgroundColor: 'white' }}>
            {/* <CssBaseline /> */}
            <AppBar
                position="fixed"
                open={open}
            >
                {Book && chooseBookModal}
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
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={4}
                        sx={{ width: '100vw' }}
                    >
                        <Box sx={{ display: 'flex' }}>
                            {/* <img src="/images/Fudz_logo.ico" alt="" width={40} height={40} /> */}
                            <Box sx={{ paddingLeft: '10px' }}>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div">
                                    Selected Book :
                                </Typography>
                            </Box>
                            <Box sx={{ marginLeft: '20px' }}>
                                <Button
                                    onClick={ToggleBookModal}
                                    className='flex justify-between w-64 border p-2 border-indigo-600 bg-white text-black text-xl font-bold'>
                                    <span>
                                        <MenuBookTwoToneIcon />
                                    </span>
                                    <div>
                                        {SelectedBook.code}
                                    </div>
                                    <span>
                                        <ExpandMoreIcon />
                                    </span>
                                </Button>
                            </Box>
                        </Box>
                        <Box
                            sx={{ flexGrow: 0 }}>
                            <IconButton
                                className='mx-10'>
                                <Badge
                                    badgeContent={1}
                                    color="secondary">
                                    <NotificationsNoneOutlinedIcon
                                        sx={{ color: 'white' }} />
                                </Badge>
                            </IconButton>


                            {/* <IconButton
                                    sx={{ p: 0 }}>
                                    <Avatar
                                        alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton> */}
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={openAccountSettings ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openAccountSettings ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={openAccountSettings}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> My Profile
                                </MenuItem>
                                <MenuItem onClick={handleClose}> 
                                    <ListItemIcon>
                                        <TaskIcon fontSize="small" />
                                    </ListItemIcon>
                                    My Activities
                                </MenuItem>
                                <Divider />
                                {/* <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <PersonAdd fontSize="small" />
                                    </ListItemIcon>
                                    Add another account
                                </MenuItem> */}
                                {/* <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Settings
                                </MenuItem> */}
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>


                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={false}
                            // onClose={handleCloseUserMenu}
                            >
                                {/* {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))} */}
                            </Menu>
                        </Box>
                    </Stack>
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
                <Box>
                    <ListItemButton sx={{ pl: 1 }} onClick={() => handleRoutes('/Dashboard')} selected={module == 'Dashboard'}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItemButton>
                    {/* <ListItemButton sx={{ pl: 1 }} >
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sales Management"
                            sx={{
                                fontWeight: ToggleCollapse === 2 ? 'bold' : 'normal', // Use 'bold' if ToggleCollapse is 2, otherwise 'normal' 
                                // Add other styles as needed
                            }} />
                        {ToggleCollapse == 111 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 1 }}  >
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Purchasing Management"
                            sx={{
                                fontWeight: ToggleCollapse === 2 ? 'bold' : 'normal', // Use 'bold' if ToggleCollapse is 2, otherwise 'normal' 
                                // Add other styles as needed
                            }} />
                        {ToggleCollapse == 111 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 1 }}  >
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Project Management"
                            sx={{
                                fontWeight: ToggleCollapse === 2 ? 'bold' : 'normal', // Use 'bold' if ToggleCollapse is 2, otherwise 'normal' 
                                // Add other styles as needed
                            }} />
                        {ToggleCollapse == 111 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton> */}
                    <ListItemButton sx={{ pl: 1 }} onClick={() => handleClickToggle(1)} selected={ToggleCollapse == 1}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Accounting Management"
                            sx={{
                                fontWeight: ToggleCollapse === 2 ? 'bold' : 'normal', // Use 'bold' if ToggleCollapse is 2, otherwise 'normal' 
                                // Add other styles as needed
                            }} />
                        {ToggleCollapse == 1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={ToggleCollapse == 1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {AccountingManagementList.map(page => (
                                <ListItemButton sx={{ pl: 2 }} key={page.name} onClick={() => handleRoutes("/AccountingManagement/" + page.name.replaceAll(" ", ""))} selected={module == "/Transaction/" + page.name}>
                                    <ListItemIcon>
                                        <page.icon />
                                    </ListItemIcon>
                                    <ListItemText primary={page.name} />
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>
                </Box>

                <Divider />
                <Box>
                    <ListItemButton sx={{ pl: 1 }}
                        onClick={() => handleClickToggle(2)} selected={ToggleCollapse == 2}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="System Configuration"
                            sx={{
                                fontWeight: ToggleCollapse === 2 ? 'bold' : 'normal', // Use 'bold' if ToggleCollapse is 2, otherwise 'normal' 
                                // Add other styles as needed
                            }} />
                        {ToggleCollapse == 2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={ToggleCollapse == 2} timeout="auto" unmountOnExit>
                        <List>
                            {
                                UseSetupList.SystemConfig.map(page => (
                                    <ListItemButton sx={{ pl: 2 }} key={page.name} onClick={() => handleRoutes("/Setup/" + page.name.replaceAll(" ", ""))} selected={module == "/Setup/" + page.name.replaceAll(" ", "")}>
                                        <ListItemIcon>
                                            <page.icon />
                                        </ListItemIcon>
                                        <ListItemText primary={page.name} />
                                    </ListItemButton>
                                ))
                            }
                        </List>
                        <Box>
                            <ListItemButton
                                onClick={() => handleClickChildToggle(1)}>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Account Management" />
                                {CollapseChildIndexState == 1 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={CollapseChildIndexState == 1} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {
                                        UseSetupList.Accounts.map(page => (
                                            <ListItemButton sx={{ pl: 4 }} key={page.name}>
                                                <ListItemIcon>
                                                    <page.icon />
                                                </ListItemIcon>
                                                <ListItemText primary={page.name} />
                                            </ListItemButton>
                                        ))
                                    }
                                </List>
                            </Collapse>
                        </Box>

                        <Box>
                            <ListItemButton
                                onClick={() => handleClickChildToggle(2)}>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Book" />
                                {CollapseChildIndexState == 2 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={CollapseChildIndexState == 2} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {
                                        UseSetupList.Book.map(page => (
                                            <ListItemButton sx={{ pl: 4 }} key={page.name} onClick={() => handleRoutes("/Setup/Book/" + page.name.replaceAll(" ", ""))} selected={module == "/Setup/Tax/" + page.name}>
                                                <ListItemIcon>
                                                    <page.icon />
                                                </ListItemIcon>
                                                <ListItemText primary={page.name} />
                                            </ListItemButton>
                                        ))
                                    }
                                </List>
                            </Collapse>
                        </Box>

                        <Box>
                            <ListItemButton
                                onClick={() => handleClickChildToggle(3)}>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Chart" />
                                {CollapseChildIndexState == 3 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={CollapseChildIndexState == 3} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {
                                        UseSetupList.Charts.map(page => (
                                            <ListItemButton key={page.name} sx={{ pl: 4 }} onClick={() => handleRoutes("/Setup/Chart/" + page.name.replaceAll(" ", ""))} selected={module == "/Setup/Chart/" + page.name}>
                                                <ListItemIcon>
                                                    <page.icon />
                                                </ListItemIcon>
                                                <ListItemText primary={page.name} />
                                            </ListItemButton>
                                        ))
                                    }
                                </List>
                            </Collapse>
                        </Box>

                        <Box>
                            <ListItemButton
                                onClick={() => handleClickChildToggle(4)}>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Tax" />
                                {CollapseChildIndexState == 4 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={CollapseChildIndexState == 4} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {
                                        UseSetupList.Tax.map(page => (
                                            <ListItemButton sx={{ pl: 4 }} key={page.name} onClick={() => handleRoutes("/Setup/Tax/" + page.name.replaceAll(" ", ""))} selected={module == "/Setup/Tax/" + page.name}>
                                                <ListItemIcon>
                                                    <page.icon />
                                                </ListItemIcon>
                                                <ListItemText primary={page.name} />
                                            </ListItemButton>
                                        ))
                                    }
                                </List>
                            </Collapse>
                        </Box>

                        <Box>
                            <ListItemButton
                                onClick={() => handleClickChildToggle(5)}>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="More Setup" />
                                {CollapseChildIndexState == 5 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={CollapseChildIndexState == 5} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {
                                        UseSetupList.More.map(page => (
                                            <ListItemButton sx={{ pl: 4 }} key={page.name} onClick={() => handleRoutes("/Setup/More/" + page.name.replace(" ", ""))} selected={module == "/Setup/More/" + page.name}>
                                                <ListItemIcon>
                                                    <page.icon />
                                                </ListItemIcon>
                                                <ListItemText primary={page.name} />
                                            </ListItemButton>
                                        ))
                                    }
                                </List>
                            </Collapse>
                        </Box>
                    </Collapse>
                </Box>
                <Divider />
                <Box>
                    <ListItemButton sx={{ pl: 1 }}
                        onClick={() => handleClickToggle(3)} selected={ToggleCollapse == 3}>
                        <ListItemIcon>
                            <LineAxisIcon />
                        </ListItemIcon>
                        <ListItemText primary="Reports Management"
                            sx={{
                                fontWeight: ToggleCollapse === 2 ? 'bold' : 'normal', // Use 'bold' if ToggleCollapse is 2, otherwise 'normal' 
                                // Add other styles as needed
                            }} />
                        {CollapseIndexState == 3 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </Box>
            </Drawer>
            <Main style={{ overflow: 'auto', backgroundColor: 'white' }} open={open}>
                <DrawerHeader />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <Card sx={{ height: 'auto',  margin: 'auto', padding: '20px' }}>
                        {children}
                    </Card> */}
                    {children}
                </LocalizationProvider>
            </Main>
        </Box>
    );
}

