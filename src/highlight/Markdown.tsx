import React, {ElementType} from "react";
import CodeBlock from "./CodeBlock";
import HeadingBlock from "./HeadingBlock";
import ReactMarkdown from "react-markdown";
import {
    Box,
    createStyles,
    Divider,
    Grid,
    Link,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
    Typography
} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";

const style = makeStyles((theme: Theme) => createStyles({
    inlineCode: {
        background: theme.palette.info.light,
        borderRadius: "4px",
        color: theme.palette.background.paper,
        padding: "2px",
    },
    divider: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    quote: {
        background: theme.palette.background.default,
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        borderLeft: "4px " + theme.palette.divider + " solid"
    },
    list: {},
    tableHead: {
        background: theme.palette.background.default
    },
    tableRoot: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        border: "2px " + theme.palette.divider + " solid"
    },
    imgBox: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        cursor: "pointer"
    }
}));

type Comp = { children: any | JSX.Element }

const ImageBlock = React.memo((props: { src: string, alt: string }) => {
    const styles = style();
    const handleImgClick = () => {

    };
    return (
        <Grid container justify={"center"} className={styles.imgBox}>
            <Grid item onClick={handleImgClick}>
                <img src={props.src} alt={props.alt}/>
            </Grid>
        </Grid>
    )
});

const ParagraphBlock = React.memo((props: Comp) => {
    return (<Typography variant={"body1"} component={"div"}>{props.children}</Typography>)
});

const TableRowBlock = React.memo((props: Comp) => {
    return (<TableRow>{props.children}</TableRow>)
});

const TableCellBlock = React.memo((props: Comp) => {
    return (<TableCell>{props.children}</TableCell>)
});

const TableHeadBlock = React.memo((props: Comp) => {
    const styles = style();
    return (<TableHead className={styles.tableHead}>{props.children}</TableHead>)
});

const TableBodyBlock = React.memo((props: Comp) => {
    return (<TableBody>{props.children}</TableBody>)
});

const TableBlock = React.memo((props: Comp) => {
    const styles = style();
    return (
        <TableContainer className={styles.tableRoot}>
            <Table>{props.children}</Table>
        </TableContainer>)
});

const ListItemBlock = React.memo((props: Comp) => {
    return (
        <li>
            <Typography variant={"subtitle1"} component={"div"}>{props.children}</Typography>
        </li>
    )
});

const ListBlock = React.memo((props: Comp) => {
    return (<ul>{props.children}</ul>)
});

const QuoteBlock = React.memo((props: Comp) => {
    const styles = style();
    return (<Box className={styles.quote}>{props.children}</Box>)
});

const InlineCode = React.memo((props: Comp) => {
    const styles = style();
    return (
        <Typography variant={"caption"} component={"span"} className={styles.inlineCode}>{props.children}</Typography>)
});

const DividerBlock = React.memo(() => {
    const styles = style();
    return (<Divider className={styles.divider} variant={"middle"}/>)
});

const renderTypeMap: { [nodeType: string]: ElementType } = {
    link: Link,
    linkReference: Link,
    heading: HeadingBlock,
    image: ImageBlock,
    code: CodeBlock,
    paragraph: ParagraphBlock,
    table: TableBlock,
    tableBody: TableBodyBlock,
    tableRow: TableRowBlock,
    tableCell: TableCellBlock,
    tableHead: TableHeadBlock,
    list: ListBlock,
    listItem: ListItemBlock,
    blockquote: QuoteBlock,
    inlineCode: InlineCode,
    thematicBreak: DividerBlock
};

export default function Markdown(props: { markdown: string }) {

    return (<ReactMarkdown source={props.markdown} escapeHtml={false}
                           includeNodeIndex={true}
                           renderers={renderTypeMap}/>)
}