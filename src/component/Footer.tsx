import React from "react";
import {createStyles, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const style = makeStyles((theme) => createStyles({
    main: {
        background: theme.palette.grey["600"],
        height: "auto",
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    text: {
        color: theme.palette.grey["300"]
    },
    row: {
        height: "46px"
    }
}));

export default function Footer() {

    const styles = style();
    const infos: string[] = [
        "Github: dengzii",
        "Email:master@dengzii.com",
        "Location: Shenzhen",
        "Powered By: React"];

    return (<Grid container={true} className={styles.main} justify={"center"}>
        <Grid item={true} xs={12} md={10} lg={6}>
            <Grid item={true} container xs={12}>
                {infos.map((value) => (
                    <Grid xs={6} item={true} className={styles.row} key={value}>
                        <Typography className={styles.text} variant="overline" display="block" gutterBottom
                                    align={"left"}>{value}</Typography>
                    </Grid>))}
            </Grid>
            <Grid item={true} container xs={6} className={styles.row}>
                <Typography className={styles.text} variant="overline" display="block" gutterBottom align={"center"}>
                    X公网安备 XXXXXXXXXXXXXXX 号
                </Typography>
            </Grid>
        </Grid>
    </Grid>)
}