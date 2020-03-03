import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {green, red} from "@material-ui/core/colors";


const theme = createMuiTheme({
    palette: {
        primary: red,
        secondary: green,
    },
});

export default theme