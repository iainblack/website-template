import Head from "next/head";
import { Inter } from "next/font/google";
import { AppBar, Box, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/Theme";
import React, { useState, useEffect } from "react";
import ContentPanel from "@/components/ContentPanel/ContentPanel";
import { useRouter } from "next/router";
import Header, { DynamicTab } from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

interface AppBarState {
  transparent: boolean;
  elevated: boolean;
  logo: boolean;
  display: boolean;
}

export default function Home() {
  const router = useRouter();
  const [appBarState, setAppBarState] = useState<AppBarState>({
    transparent: true,
    elevated: false,
    logo: false,
    display: true,
  });

  const tabs: DynamicTab[] = [
    {
      name: "Home",
      onClick: (event) => {
        router.push("/");
      },
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
        <AppBar
          position="fixed"
          enableColorOnDark
          sx={{
            pl: { xs: 2, md: 6 },
            pr: 2,
            backgroundColor: "primary.dark",
          }}
        >
          <Header tabs={tabs} logo={appBarState.logo} />
        </AppBar>
        <Box>
          <ContentPanel iterator={4} />
        </Box>
      </main>
    </ThemeProvider>
  );
}
