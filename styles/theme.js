import { extendTheme } from "@chakra-ui/react";
import "@fontsource/pacifico";

const theme = extendTheme({
  components: {
    Heading:  {
      variants: {
        "logo": {
          color: "#1DB954",
          fontFamily: "Pacifico",
    }}},
    Box:{
      variants: {
        "card": {
          padding:"2rem",
          backgroundColor:"white",          
          borderRadius:"3%",
          boxShadow:"4px 4px 8px 0 rgba(0, 0, 0, 0.2), 6px 6px 20px 0 rgba(0, 0, 0, 0.3)",
    }}},
  }
});

export default theme;