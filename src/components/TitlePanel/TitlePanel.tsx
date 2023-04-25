import styles from "@/styles/Home.module.css";
import { Box, Fade, Slide } from "@mui/material";
import Image from "next/image";
import React from "react";
import { TitlePanelContainer } from "./styles";

interface TitlePanelProps {}

const TitlePanel: React.FC<TitlePanelProps> = ({ ...props }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  return (
    <TitlePanelContainer>
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
      <Box className={styles.center}>
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
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      height: "25vh",
                      width: { xs: "80vw", md: "35vw" },
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <Image
                      className={styles.logo}
                      src={"/next.svg"}
                      alt="Benniditos"
                      fill
                      sizes="100%"
                      priority={true}
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                        zIndex: 1,
                      }}
                    />
                  </Box>
                </Box>
              </Slide>
            </Box>
          </Fade>
        </Box>
      </Box>
    </TitlePanelContainer>
  );
};

export default TitlePanel;
