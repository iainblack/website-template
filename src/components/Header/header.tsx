import {
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
  useTheme,
  Popover,
  Slide,
} from "@mui/material";
import React, { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Image, { StaticImageData } from "next/image";
import DrawerList from "./DrawerList";
import styles from "@/styles/Home.module.css";

export interface DynamicTab {
  name: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  external?: boolean;
  subTabs?: DynamicTab[];
}

interface HeaderProps {
  handleTabChange?: (event: React.SyntheticEvent, newValue: number) => void;
  logo?: boolean;
  tabs: DynamicTab[];
  animate?: boolean;
}

const Header: React.FC<HeaderProps> = ({ ...props }) => {
  const theme = useTheme();
  const [animateTabs, setAnimateTabs] = React.useState(false);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [expandableDrawerItemOpen, setExpandableDrawerItemOpen] =
    React.useState(false);

  const handleExpandableDrawerItemClick = () => {
    setExpandableDrawerItemOpen(!expandableDrawerItemOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState<any | null>(null);
  const popoverOpen = Boolean(anchorEl);

  const containerRef = React.useRef(null);

  const handleExpandableTabClick = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleExpandableTabClose = () => {
    setAnchorEl(null);
  };
  const scrollAfterDrawerClose = React.useRef<Record<string, any> | undefined>(
    undefined
  );

  useEffect(() => {
    if (scrollAfterDrawerClose.current) {
      props.handleTabChange &&
        props.handleTabChange(
          scrollAfterDrawerClose.current.event,
          scrollAfterDrawerClose.current.index
        );
      scrollAfterDrawerClose.current = undefined;
    }
  }, [drawerOpen]);

  useEffect(() => {
    if (!props.animate) return;
    setTimeout(() => {
      setAnimateTabs(true);
    }, 1000);
  }, []);

  return (
    <>
      <Toolbar disableGutters>
        {props.logo && (
          <IconButton
            disableRipple={true}
            disableFocusRipple={true}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Image
              className={styles.logo}
              src="/next.svg"
              alt="logo"
              width={100}
              height={40}
              style={{
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1),
                objectFit: "contain",
              }}
            />
          </IconButton>
        )}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", lg: "none" },
            justifyContent: "right",
          }}
        >
          <IconButton
            size="large"
            aria-haspopup="true"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon fontSize="medium" />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => {
              setDrawerOpen(false);
              expandableDrawerItemOpen && handleExpandableDrawerItemClick();
            }}
            PaperProps={{
              sx: {
                width: { xs: 250, sm: 300 },
              },
            }}
          >
            <DrawerList
              tabs={props.tabs}
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}
              scrollAfterClose={scrollAfterDrawerClose}
              handleExpandableDrawerItemClick={handleExpandableDrawerItemClick}
              expandableDrawerItemOpen={expandableDrawerItemOpen}
              setExpandableDrawerItemOpen={setExpandableDrawerItemOpen}
            />
          </Drawer>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", lg: "flex" },
            overflow: "hidden",
            justifyContent: "right",
          }}
          id="tabs-container"
          ref={containerRef}
        >
          <Slide
            in={props.animate ? animateTabs : true}
            direction="up"
            container={containerRef.current}
            timeout={props.animate ? 1000 : 0}
          >
            <Tabs
              value={false}
              onChange={props.handleTabChange}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "transparent",
                },
              }}
            >
              {props.tabs?.map((tab, index) => (
                <Tab
                  key={index}
                  label={tab.name}
                  onClick={(e) => {
                    tab.subTabs && tab.subTabs.length > 0
                      ? handleExpandableTabClick(e)
                      : tab.onClick && tab.onClick(e as any);
                  }}
                  sx={{
                    textTransform: "none",
                  }}
                />
              ))}
              {props.tabs?.map((navTab, index) => (
                <Popover
                  key={`popover-${index}`}
                  disableScrollLock
                  open={popoverOpen}
                  anchorEl={anchorEl}
                  onClose={handleExpandableTabClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  PaperProps={{
                    sx: {
                      borderRadius: 1,
                      border: 1,
                    },
                  }}
                >
                  <List>
                    {navTab.subTabs &&
                      navTab.subTabs.length > 0 &&
                      navTab.subTabs.map((subTab, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemButton
                            sx={{
                              whiteSpace: "nowrap",
                              "&:hover": {
                                color: "primary.main",
                                borderColor: "none",
                              },
                            }}
                            onClick={(e) => {
                              subTab.onClick && subTab.onClick(e as any);
                              handleExpandableTabClose();
                            }}
                          >
                            <ListItemText
                              primary={subTab.name}
                              primaryTypographyProps={{
                                textAlign: "center",
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                  </List>
                </Popover>
              ))}
            </Tabs>
          </Slide>
        </Box>
      </Toolbar>
    </>
  );
};

export default Header;
