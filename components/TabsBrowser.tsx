import React, { ReactNode } from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { SvgIconTypeMap } from '@mui/material';

interface TabData {
  index: number;
  title: string;
  icon: React.ReactNode;
}

interface TabsBrowserProps {
  paramTabs: TabData[];
  children: ReactNode;
}

export default function TabsBrowser({ paramTabs, children }: TabsBrowserProps) {
  const [index, setIndex] = React.useState(0);

  return (
    <div>
      <Tabs
        aria-label="tabs"
        value={index}
        onChange={(event, newValue) => setIndex(newValue as number)}
      >
        <TabList
          variant="soft"
          sx={{
            [`& .${tabClasses.root}`]: {
              '&[aria-selected="true"]': {
                bgcolor: 'background.surface',
                borderColor: 'divider',
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  height: 2,
                  bottom: -2,
                  left: 0,
                  right: 0,
                  bgcolor: 'background.surface',
                },
              },
            },
          }}
        >
          {paramTabs.map((tab) => (
            <Tab key={tab.index} indicatorPlacement="top">
              <ListItemDecorator>{tab.icon}</ListItemDecorator>
              {tab.title}
            </Tab>
          ))}
        </TabList>
      </Tabs>

      {/* Render the content of the selected tab */}
      {React.Children.map(children, (child, tabIndex) => (
        <div key={tabIndex} hidden={tabIndex !== index}>
          {child}
        </div>
      ))}
    </div>
  );
}
