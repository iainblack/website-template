import Head from "next/head";
import { Inter } from "next/font/google";
import { AppBar, Box, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/Theme";
import styles from "@/styles/Home.module.css";
import TitlePanel from "@/components/TitlePanel/TitlePanel";
import React, { useState, useEffect } from "react";
import ContentPanel from "@/components/ContentPanel/ContentPanel";
import { useRouter } from "next/router";
import { HideOnScroll } from "@/components/Utils/utils";
import Header, { DynamicTab } from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

interface AppBarState {
  transparent: boolean;
  elevated: boolean;
  logo: boolean;
  display: boolean;
}

interface TransitionState {
  transitionInOne: boolean;
  transitionInTwo: boolean;
  transitionInThree: boolean;
}

export default function Home() {
  const router = useRouter();
  const [appBarState, setAppBarState] = useState<AppBarState>({
    transparent: true,
    elevated: false,
    logo: false,
    display: true,
  });

  const [transitionState, setTransitionState] = useState<TransitionState>({
    transitionInOne: false,
    transitionInTwo: false,
    transitionInThree: false,
  });

  const refOne = React.useRef<HTMLDivElement>(null);
  const refTwo = React.useRef<HTMLDivElement>(null);
  const refThree = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // appBarState manipulation
      if (window.visualViewport?.height && scrollPosition < 1) {
        setAppBarState({
          transparent: true,
          elevated: false,
          logo: false,
          display: true,
        });
      } else if (
        window.visualViewport?.height &&
        scrollPosition > 5 &&
        scrollPosition < window.visualViewport?.height
      ) {
        setAppBarState({
          ...appBarState,
          elevated: true,
          transparent: false,
          display: false,
        });
      } else if (
        window.visualViewport?.height &&
        scrollPosition > window.visualViewport?.height
      ) {
        setAppBarState({
          ...appBarState,
          logo: true,
          display: true,
        });
      }

      // Panel transitions
      const refOneTop = refOne.current?.offsetTop;
      const refTwoTop = refTwo.current?.offsetTop;
      const refThreeTop = refThree.current?.offsetTop;

      if (
        refOneTop &&
        !transitionState.transitionInOne &&
        scrollPosition > refOneTop - 500
      ) {
        setTransitionState({
          ...transitionState,
          transitionInOne: true,
        });
      }
      if (
        refTwoTop &&
        !transitionState.transitionInTwo &&
        scrollPosition > refTwoTop - 500
      ) {
        setTransitionState({
          ...transitionState,
          transitionInTwo: true,
        });
      }
      if (
        refThreeTop &&
        !transitionState.transitionInThree &&
        scrollPosition > refThreeTop - 500
      ) {
        setTransitionState({
          ...transitionState,
          transitionInThree: true,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [appBarState, transitionState]);

  // scroll to content
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        refOne.current &&
          refOne.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        break;
      case 1:
        refTwo.current &&
          refTwo.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        break;
      case 2:
        refThree.current &&
          refThree.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        break;
      default:
    }
  };

  // create tabs for header and drawer
  const tabs: DynamicTab[] = [
    {
      name: "Scroll to One",
    },
    {
      name: "Scroll to Two",
    },
    {
      name: "Scroll to Three",
    },
    {
      name: "Internal Route",
      onClick: (event) => {
        router.push("/navExample");
      },
    },
    {
      name: "External Route",
      external: true,
      onClick: (event) => {
        window.open("https://www.google.com", "_blank");
      },
    },
    {
      name: "Expandable Nav Tab",
      onClick: (event) => {
        console.log("contact clicked");
      },
      subTabs: [
        {
          name: "External",
          external: true,
          onClick: (event) => {
            window.open("https://www.google.com", "_blank");
          },
        },
        {
          name: "Internal",
          onClick: (event) => {
            router.push("/navExample");
          },
        },
      ],
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>Template</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        <HideOnScroll>
          <AppBar
            position="fixed"
            enableColorOnDark
            color="transparent"
            elevation={appBarState.elevated ? 4 : 0}
            sx={{
              display: appBarState.display ? "flex" : "none",
              backdropFilter: "blur(5px)",
              pl: { xs: 2, md: 6 },
              pr: 2,
            }}
          >
            <Header
              tabs={tabs}
              handleTabChange={handleTabChange}
              logo={appBarState.logo}
              animate
            />
          </AppBar>
        </HideOnScroll>
        <TitlePanel />
        <Box ref={refOne}>
          <ContentPanel
            iterator={1}
            transitionIn={transitionState.transitionInOne}
          />
        </Box>
        <Box ref={refTwo}>
          <ContentPanel
            iterator={2}
            odd
            transitionIn={transitionState.transitionInTwo}
          />
        </Box>
        <Box ref={refThree}>
          <ContentPanel
            iterator={3}
            transitionIn={transitionState.transitionInThree}
          />
        </Box>
        <Footer odd={true} />
      </main>
    </ThemeProvider>
  );
}
