import React from "react";
import {createStyles, Fab, Grid} from "@material-ui/core";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";

const style = makeStyles((theme) => createStyles({
    fabBox: {
        position: "absolute",
        bottom: theme.spacing(6),
        right: theme.spacing(8)
    }
}));

export default function Foreground() {

    const styles = style();
    return (<Box zIndex={-1} position={"fixed"} minHeight={"100vh"} width={"100%"}>
        <Grid container justify={"center"}>

        </Grid>
        <Box zIndex={9999} className={styles.fabBox}>
            <Fab color="primary" aria-label="up">
                <UpIcon/>
            </Fab>
        </Box>
    </Box>)
}