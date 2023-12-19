import React from 'react';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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

export const UseTransactionNav = [ 
    {
        name: "Invoicing",
        icon: ReceiptIcon
    },
    {
        name: "Official Receipt",
        icon: PointOfSaleIcon
    },
    {
        name: "Accounts Payable Voucher",
        icon:  ShoppingBagIcon
    },
    {
        name: "Check Voucher",
        icon: PaymentsIcon
    },
    {
        name: "Journal Voucher",
        icon: LibraryBooksIcon
    },
    {
        name: "Debit / Credit memo",
        icon: BrokenImageIcon
    },
    {
        name: "Transaction Viewer",
        icon: SearchIcon
    }
]

export const UseSetupList = {
    SystemConfig:[
        {
            name: "Company",
            icon: DashboardIcon
        },
        {
            name: "Currency",
            icon: ReceiptIcon
        }, 
        {
            name: "Aging Range",
            icon: ReceiptIcon
        },  
        {
            name: "Business Partners",
            icon: ReceiptIcon
        },  
        {
            name: "GL Beginning Balance",
            icon: ReceiptIcon
        },  
    ],
    Accounts:[
        {
            name: "Access Control",
            icon: ReceiptIcon
        }, 
        {
            name: "User Account",
            icon: ReceiptIcon
        }, 
        {
            name: "Change password",
            icon: ReceiptIcon
        }, 
    ],
    Book:[
        {
            name: "Book Codes",
            icon: ReceiptIcon
        }, 
        {
            name: "Journal Book Codes",
            icon: ReceiptIcon
        },  
    ],
    Charts:[ 
        {
            name: "Chart Class",
            icon: ReceiptIcon
        }, 
        {
            name: "Chart Group",
            icon: ReceiptIcon
        },  
        {
            name: "Chart of Account",
            icon: ReceiptIcon
        }, 
    ],
    Tax:[
        {
            name: "Expanded Tax Withheld Library",
            icon: ReceiptIcon
        }, 
        {
            name: "Final Tax Withheld Library",
            icon: ReceiptIcon
        }, 
        {
            name: "Input Vat",
            icon: ReceiptIcon
        }, 
        {
            name: "Output Vat",
            icon: ReceiptIcon
        }, 
    ],
    More:[
        {
            name: "Currency Setup",
            icon: ReceiptIcon
        },
        {
            name: "Industry Setup",
            icon: ReceiptIcon
        }, 
        {
            name: "Category Setup",
            icon: ReceiptIcon
        }, 
        {
            name: "Bank Setup",
            icon: ReceiptIcon
        }, 
        {
            name: "Department Setup",
            icon: ReceiptIcon
        }, 
        {
            name: "Project Setup",
            icon: ReceiptIcon
        }, 
        {
            name: "Terms Setup",
            icon: ReceiptIcon
        }, 
        {
            name: "Project Unit Setup",
            icon: ReceiptIcon
        }, 
        
    ],


}
