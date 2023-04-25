import { Box, styled } from "@mui/material";

export const TitlePanelContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "25vh",
  position: "relative",
  zIndex: 1,
}));
