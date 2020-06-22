import React from "react";
import {Backdrop, BackdropClassKey, createStyles, FadeProps, StandardProps, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface LargeImageProps extends StandardProps<React.HTMLAttributes<HTMLDivElement> & Partial<FadeProps>,
    BackdropClassKey> {
    src: string
    open: boolean
    alt: string
    onClick: () => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    backdrop: {
        zIndex: 9999,
        color: '#fff',
    },
    img: {
        maxHeight: "100vh",
        maxWidth: "100%",
        background: "#00000055"
    }
}));

export default function LargeImage(props: LargeImageProps) {

    const styles = useStyles();
    return (
        <>
            <img src={props.src} alt={props.alt} width={'100%'}/>
            <Backdrop open={props.open} onClick={props.onClick} className={styles.backdrop}>
                <img className={styles.img} src={props.src} alt={''}/>
            </Backdrop>
        </>
    )
}