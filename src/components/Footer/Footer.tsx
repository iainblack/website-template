import {
  Fade,
  Box,
  Slide,
  Divider,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import React from "react";
import { FooterContainer } from "./styles";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import { FacebookOutlined, Instagram, Twitter } from "@mui/icons-material";

interface ContentPanelProps {
  odd?: boolean;
}

const links = ["Home", "Features", "Contact", "About"];

const Footer: React.FC<ContentPanelProps> = ({ ...props }) => {
  const theme = useTheme();
  return (
    <FooterContainer odd={props.odd}>
      <Box
        sx={{
          display: { xs: "column", sm: "flex" },
          justifyContent: "space-between",
          width: "90%",
          textAlign: "center",
        }}
      >
        <Box>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="logo"
            width={100}
            height={30}
            style={{
              objectFit: "contain",
            }}
          />
        </Box>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            {links.map((link, index) => (
              <Button
                key={index}
                sx={{
                  color: theme.palette.text.primary,
                  mx: 1,
                }}
              >
                {link}
              </Button>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <IconButton>
              <FacebookOutlined />
            </IconButton>
            <IconButton>
              <Instagram />
            </IconButton>
            <IconButton>
              <Twitter />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 2, width: "90%" }} variant="middle" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box sx={{ color: theme.palette.text.secondary, fontSize: 12 }}>
          ©Copyright. All rights reserved.
        </Box>
      </Box>
    </FooterContainer>
  );
};

export default Footer;
