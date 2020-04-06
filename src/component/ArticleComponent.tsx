import React from "react";
import {Box, Divider, Grid, Typography} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../highlight/CodeBlock";
import HeadingBlock from "../highlight/HeadingBlock";

const StyleMainContainer = {
    paddingLeft: '40px',
    paddingTop: '50px',
    paddingRight: '40px',
};

export default function ArticleComponent() {

    return (
        <Grid container justify={"center"} style={StyleMainContainer}>
            <Grid item={true} xl={12} md={12} sm={12}>
                <Box style={{padding: '16px 32px'}}>
                    <Typography variant={"h4"} gutterBottom>
                        路由匹配原理
                    </Typography>
                    <Divider/>
                    <ReactMarkdown source={getMarkdown()}
                                   escapeHtml={false}
                                   renderers={{code: CodeBlock, heading: HeadingBlock}}/>
                </Box>
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