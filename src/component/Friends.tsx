import React from "react";
import {Avatar, Box, Button, createStyles, Divider, Grid, Paper, TextField, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(4),
            paddingLeft: theme.spacing(6),
            paddingRight: theme.spacing(6)
        },
        avatar: {
            width: theme.spacing(8),
            height: theme.spacing(8)
        },
        nameAndBio: {
            height: theme.spacing(8),
            paddingLeft: theme.spacing(2)
        },
        item: {
            borderRadius: theme.spacing(1),
            cursor: "pointer",
            "&:hover": {
                background: theme.palette.action.hover
            }
        },
        input: {
            paddingRight: theme.spacing(2)
        },
        title: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2)
        }
    })
);

export default function Friends() {

    const styles = useStyles();
    const friends = ['Dave', 'Tom', 'Frank', 'Tony', 'Ellis', 'Mike', 'Alex', 'Ellis', 'Mike', 'Alex'];
    const handleItemClick = () => {
        console.log("");
    };
    return (
        <Paper className={styles.root}>
            <Typography variant={"h5"}>
                我的朋友们
            </Typography>
            <br/><br/>
            <Grid container spacing={4}>
                {friends.map((value) => (
                    <Grid item xs={12} sm={6} lg={4} md={4} className={styles.item} onClick={handleItemClick}>
                        <Box style={{display: "flex"}}>
                            <Avatar variant={"circle"} src={"/pic.jpg"} className={styles.avatar}
                                    style={{margin: "0px"}}>
                                {value}
                            </Avatar>
                            <Box className={styles.nameAndBio}>
                                <Typography variant={"subtitle1"}>{value}</Typography>
                                <Typography variant={"subtitle1"} color={"textSecondary"}>{value}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
                <Divider variant={"middle"}/><br/>
                <Grid item xs={12}>
                    <Typography className={styles.title} variant={"h5"}>
                        和我成为朋友
                    </Typography>
                    <TextField className={styles.input} label="如何称呼" required/>
                    <TextField className={styles.input} label="主页" required/><br/>
                    <TextField className={styles.input} label="一句话简介"/>
                    <TextField className={styles.input} label="一个头像"/>
                    <TextField className={styles.input} label="联系方式"/><br/><br/>
                    <Button variant="contained" color="primary" disableElevation size={"large"}>提 交</Button>
                </Grid>
            </Grid>
        </Paper>
    )
}