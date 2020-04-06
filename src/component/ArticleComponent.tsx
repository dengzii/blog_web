import React from "react";
import {Box, createStyles, Divider, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../highlight/CodeBlock";
import HeadingBlock from "../highlight/HeadingBlock";
import {makeStyles} from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';

const style = makeStyles((theme) => createStyles({
    root: {},
    titleBox: {
        padding:theme.spacing(4),
        paddingBottom: theme.spacing(2)
    },
    title: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(2)
    },
    articleBody: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    }
}));

export default function ArticleComponent() {

    const styles = style();
    return (
        <Grid container justify={"center"} spacing={1}>
            <Grid item={true} xs={12} md={9} lg={9}>
                <Paper elevation={0}>
                    <Box className={styles.titleBox}>
                        <Typography variant={"h4"} component={"span"} gutterBottom align={"justify"}>
                            路由匹配原理
                        </Typography>
                        <Typography variant={"h4"} component={"span"} gutterBottom align={"right"}>
                            <IconButton aria-label="delete" size="medium">
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                        </Typography>
                    </Box>
                    <Divider light={true} variant="middle"/>
                    <Box className={styles.articleBody}>
                        <ReactMarkdown source={getMarkdown()} escapeHtml={false}
                                       renderers={{code: CodeBlock, heading: HeadingBlock}}/>
                    </Box>

                </Paper>
            </Grid>
            <Grid item={true} xs={12} md={3} lg={3}>
                <Paper elevation={0} className={styles.articleBody}>
                    Catalog
                    1.AAAAA
                    2.BBBBB
                </Paper>
            </Grid>
        </Grid>
    )
}

function getMarkdown(): string {
    return "## API\n" +
        "\n" +
        "### PreviewLayout\n" +
        "\n" +
        "| 参数     | 说明                       | 类型 | 默认值 | 版本  |\n" +
        "| :------- | :------------------------- | :--: | :----: | :---: |\n" +
        "| children | 传递的组件，可以是任意组件 | jsx  |  null  | 0.1.0 |\n" +
        "\n" +
        "### MdPreviewer\n" +
        "\n" +
        "| 参数 | 说明          |  类型  | 默认值 | 版本  |\n" +
        "| :--- | :------------ | :----: | :----: | :---: |\n" +
        "| md   | markdown 文档 | string |  null  | 0.1.0 |\n" +
        "\n" +
        "### CodePreviewer\n" +
        "\n" +
        "| 参数     | 说明           |  类型  | 默认值 | 版本  |\n" +
        "| :------- | :------------- | :----: | :----: | :---: |\n" +
        "| code     | 要显示的代码   | string |  null  | 0.0.1 |\n" +
        "| showCode | 是否要展示代码 |  bool  |  true  | 0.1.0 |" +
        "\n\n" +
        "```java\n" +
        "public class A {\n" +
        "    public static void main(){\n" +
        "        System.out.println('H');\n" +
        "    }\n" +
        "}\n" +
        "```\n\n" +
        "# H1H1\n" +
        "## H2H2\n" +
        "### H3H3\n" +
        "#### H4\n" +
        "##### H5\n" +
        "###### H6\n\n###### H6\n\n###### H6\n\n###### H6\n\n###### H6\n\n###### H6\n\n###### H6\n\n###### H6\n\n###### H6\n\n###### H6\n\n###### H6\n\n###### H6\n\n###### H6\n\n###### H6\n\n"
}