import { Fade, Box, Slide } from "@mui/material";
import React from "react";
import { ContentPanelContainer } from "./styles";

interface ContentPanelProps {
  iterator: number;
  odd?: boolean;
  transitionIn?: boolean;
}

const ContentPanel: React.FC<ContentPanelProps> = ({ ...props }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  return (
    <ContentPanelContainer odd={props.odd}>
      <Fade
        in={props.transitionIn === undefined ? true : props.transitionIn}
        timeout={1750}
      >
        <Box>
          <Slide
            in={props.transitionIn === undefined ? true : props.transitionIn}
            timeout={1000}
            direction={"up"}
            container={containerRef.current}
          >
            <h1>Content Panel {props.iterator}</h1>
          </Slide>
        </Box>
      </Fade>
    </ContentPanelContainer>
  );
};

export default ContentPanel;
