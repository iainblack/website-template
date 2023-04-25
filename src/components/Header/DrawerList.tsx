import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  useTheme,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { OpenInNewOutlined } from "@mui/icons-material";
import { DynamicTab } from "./Header";

interface DrawerListProps {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  tabs: DynamicTab[];
  scrollAfterClose: React.MutableRefObject<Record<string, any> | undefined>;
  expandableDrawerItemOpen: boolean;
  setExpandableDrawerItemOpen: (open: boolean) => void;
  handleExpandableDrawerItemClick: () => void;
}

const DrawerList: React.FC<DrawerListProps> = ({ ...props }) => {
  const theme = useTheme();
  return (
    <Box
      role="presentation"
      sx={{
        width: { xs: 250, sm: 300 },
      }}
    >
      <List>
        {props.tabs?.map((tab, index) => (
          <Box key={index}>
            {tab.subTabs && tab.subTabs.length > 0 ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      mx: "10%",
                      whiteSpace: "nowrap",
                      border: 1,
                      my: 1,
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                    onClick={props.handleExpandableDrawerItemClick}
                  >
                    <ListItemText
                      primary={tab.name}
                      primaryTypographyProps={{
                        textAlign: "center",
                        fontFamily: "header",
                      }}
                    />
                    {props.expandableDrawerItemOpen ? (
                      <ExpandLess fontSize="small" />
                    ) : (
                      <ExpandMore fontSize="small" />
                    )}
                  </ListItemButton>
                </ListItem>
                <Collapse
                  in={props.expandableDrawerItemOpen}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {tab.subTabs.map((subTab, index) => (
                      <ListItem disablePadding key={index}>
                        <ListItemButton
                          sx={{
                            mx: "10%",
                            whiteSpace: "nowrap",
                            border: 1,
                            my: 1,
                            "&:hover": {
                              color: "primary.main",
                            },
                          }}
                          onClick={(e) =>
                            subTab.onClick && subTab.onClick(e as any)
                          }
                        >
                          <ListItemText
                            primary={subTab.name}
                            primaryTypographyProps={{
                              textAlign: "center",
                              fontFamily: "header",
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem disablePadding key={index}>
                <ListItemButton
                  sx={{
                    mx: "10%",
                    whiteSpace: "nowrap",
                    border: 1,
                    my: 1,
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                  onClick={(e) => {
                    tab.onClick
                      ? tab.onClick(e as any)
                      : (props.scrollAfterClose.current = {
                          event: e,
                          index: index,
                        });
                    props.setDrawerOpen(false);
                  }}
                >
                  <ListItemText
                    primary={tab.name}
                    primaryTypographyProps={{
                      textAlign: "center",
                      fontFamily: "header",
                    }}
                  />
                  {tab.external && (
                    <OpenInNewOutlined
                      fontSize="small"
                      sx={{ height: 14, width: 14 }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            )}
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default DrawerList;
