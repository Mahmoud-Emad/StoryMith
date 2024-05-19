// import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";


import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  defaults: {
    VAlert: {
      variant: "tonal",
    },
    VProgressCircular: {
      size: 50,
      width: 7,
      color: "primary",
    },
  },
  components: {
    ...components,
  },
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: "#1aa18f",
        },
        variables: {
          "footer-color-link": "#fff",
          "footer-color-header": "#74DDC3",
          "speed-chip": "#424242",
        },
      },
      light: {
        dark: false,
        colors: {
          background: "#f6f6f6",
          primary: "#b06060",
        },
        variables: {
          "footer-color-link": "#333",
          "footer-color-header": "#1aa18f",
          "speed-chip": "#EEEEEE",
        },
      },
    },
  },
});

export default vuetify;
