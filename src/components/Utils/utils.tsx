import { Box, Fade, Slide, useScrollTrigger } from "@mui/material";

export function ScrollToTop(props: any) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // used to display button to scroll back to top of page when scrolling down
    // must set id="back-to-top-anchor" on element to scroll to
    // then add this to the page:
    //    <ScrollTop>
    //       <Fab size="small" aria-label="scroll back to top">
    //         <KeyboardArrowUpIcon />
    //       </Fab>
    //    </ScrollTop>

    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

export function HideOnScroll(props: any) {
  // wrap app bar with this to hide on scroll
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
