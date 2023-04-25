import styles from "@/styles/Home.module.css";
import { Box, Fade, Slide } from "@mui/material";
import Image from "next/image";
import React from "react";
import { LogoContainer, TitlePanelContainer } from "./styles";

interface TitlePanelProps {}

const TitlePanel: React.FC<TitlePanelProps> = ({ ...props }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  return (
    <TitlePanelContainer
      sx={{
        mt: { xs: -5, sm: 0 },
      }}
    >
      <Image
        src="/default-bg.jpg"
        fill
        sizes="100%"
        alt="titleBackground"
        priority={true}
        placeholder="blur"
        blurDataURL="/default-bg.jpg"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          filter: "brightness(0.5)",
        }}
      />
      <Box ref={containerRef}>
        <Fade in timeout={1750}>
          <Box>
            <Slide
              in
              timeout={1000}
              direction={"up"}
              container={containerRef.current}
            >
              <Box>
                <LogoContainer sx={{ width: { xs: "50vw", md: "20vw" } }}>
                  <Image
                    className={styles.logo}
                    src={"/next.svg"}
                    alt="Title Logo"
                    fill
                    sizes="100%"
                    priority={true}
                    style={{
                      objectFit: "contain",
                      objectPosition: "center",
                      zIndex: 1,
                    }}
                  />
                </LogoContainer>
              </Box>
            </Slide>
          </Box>
        </Fade>
      </Box>
    </TitlePanelContainer>
  );
};

export default TitlePanel;
