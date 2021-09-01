import { extendTheme } from "@chakra-ui/react";
import "@fontsource/pacifico";

const theme = extendTheme({
  components: {
    Heading:  {
      variants: {
        "logo": {
          color: "#1DB954",
          fontFamily: "Pacifico",
        }
      }
    }
  }
});

export default theme;