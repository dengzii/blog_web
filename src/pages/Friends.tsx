import React, {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    createStyles,
    Divider,
    Grid,
    Paper,
    Snackbar,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Friend} from "../api/model";
import {getFriends, putFriends} from "../api/Api";

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

const emptyFriend: Friend[] = [];
const emptySnackBar = {display: false, toast: ""};
const emptyFields = {name: "", url: "", avatar: "", contact: "", desc: ""};

export default function Friends() {

    const styles = useStyles();
    const [friends, setFriends] = useState(emptyFriend);
    const [snackbar, setSnackbar] = useState(emptySnackBar);
    const [field, setField] = useState(emptyFields);
    // const field = {name: "", url: "", avatar: "", contact: "", desc: ""};

    useEffect(() => {
        const subscription = getFriends()
            .subscribe(response => {
                setFriends(response.data)
            }, error => {

            });
        return () => {
            if (!subscription.closed) {
                subscription.unsubscribe();
            }
        }
    }, []);

    const handleItemClick = (url: string) => {
        window.open(url)
    };
    const handleSubmitClick = () => {
        if (field.name.length === 0 || field.url.length === 0) {
            setSnackbar({display: true, toast: "称呼和主页是必填的哦."});
            return
        }
        putFriends(field).subscribe(() => {
                setSnackbar({display: true, toast: `你好 ${field.name}, 很快我们就能成为朋友啦!`});
            },
            error => {
                setSnackbar({display: true, toast: `交友失败, ${error}.`});
            }
        );
    };

    return (
        <Paper className={styles.root}>
            <Typography variant={"h5"}>
                我的朋友们
            </Typography>
            <br/><br/>
            <Grid container spacing={4}>
                {friends.map((value) => (
                    <Grid item xs={12} sm={6} lg={4} md={4} className={styles.item} key={value.url} onClick={e => {
                        handleItemClick(value.url)
                    }}>
                        <Box style={{display: "flex"}}>
                            <Avatar variant={"circle"} src={value.avatar} className={styles.avatar}
                                    style={{margin: "0px"}}>
                                {value.name}
                            </Avatar>
                            <Box className={styles.nameAndBio}>
                                <Typography variant={"subtitle1"}>{value.name}</Typography>
                                <Typography variant={"subtitle1"} color={"textSecondary"}>{value.url}</Typography>
                                <Typography variant={"subtitle1"} color={"textSecondary"}>{value.desc}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
                <Divider variant={"middle"}/><br/>
                <Grid item xs={12}>
                    <Typography className={styles.title} variant={"h5"}>
                        和我成为朋友
                    </Typography>
                    <TextField className={styles.input} label="如何称呼" required onChange={(e) => {
                        field.name = e.target.value;
                        setField(field)
                    }}/>
                    <TextField className={styles.input} label="主页" required onChange={(e) => {
                        field.url = e.target.value;
                        setField(field)
                    }}/><br/>
                    <TextField className={styles.input} label="一句话简介" onChange={(e) => {
                        field.desc = e.target.value;
                        setField(field)
                    }}/>
                    <TextField className={styles.input} label="一个头像" onChange={(e) => {
                        field.avatar = e.target.value;
                        setField(field)
                    }}/>
                    <TextField className={styles.input} label="联系方式" onChange={(e) => {
                        field.contact = e.target.value;
                        setField(field)
                    }}/><br/><br/>
                    <Button variant="contained" color="primary" disableElevation size={"medium"}
                            onClick={handleSubmitClick}>提 交</Button>
                    <Snackbar open={snackbar.display}
                              autoHideDuration={3000}
                              message={snackbar.toast}
                              anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                              onClose={() => {
                                  setSnackbar(emptySnackBar)
                              }}/>
                </Grid>
            </Grid>
        </Paper>
    )
}