import React from "react";
import { ContentPanelContainer } from "./styles";

interface ContentPanelProps {
  iterator: number;
  odd?: boolean;
}

const ContentPanel: React.FC<ContentPanelProps> = ({ ...props }) => {
  return (
    <ContentPanelContainer odd={props.odd}>
      <h1>Content Panel {props.iterator}</h1>
    </ContentPanelContainer>
  );
};

export default ContentPanel;
