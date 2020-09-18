import React, {ChangeEvent, useEffect, useState} from "react";
import Markdown from "../highlight/Markdown";
import {Box, createStyles, Fab, Grid, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';

const useStyles = makeStyles((theme: Theme) => createStyles({
    boxContainer: {
        height: '100vh',
        overflow: 'hidden'
    },
    textArea: {
        ...theme.typography.body1,
        height: '100vh',
        width: '98%',
        border: 'none',
        resize: 'none',
        outline: 'none',
        appearance: 'none',
        wordWrap: 'break-word',
        wrap: 'soft',
    },
    floatPrint: {
        position: "absolute",
        bottom: theme.spacing(8),
        right: theme.spacing(8)
    },
    boxPreview: {
        overflow: 'scroll',
        wordWrap: 'break-word',
        height: '100vh',
        padding: theme.spacing(4)
    }
}));

export default function Md2Pdf() {

    const style = useStyles();
    window.document.title = "Markdown";
    let cache = localStorage.getItem("md_cache");
    cache = cache == null ? defaultMarkdown : cache;

    let [printMode, setPrintMode] = useState(false);
    let [md, setMd] = useState(cache);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const ele = e.target;
        localStorage.setItem("md_cache", ele.value);
        setMd(ele.value)
    };

    const handlePrint = () => {
        setPrintMode(true);
    };

    useEffect(() => {
        if (printMode) {
            window.print();
            setPrintMode(false)
        }
    }, [printMode]);

    return (
        <>
            <Box className={style.boxContainer} hidden={printMode}>
                <Box className={style.floatPrint}>
                    <Fab color="secondary" aria-label="up" size={'large'} onClick={handlePrint}>
                        <PictureAsPdfOutlinedIcon/>
                    </Fab>
                </Box>
                <Grid container>
                    <Grid item xs={6}>
                        <Box>
                            <textarea className={style.textArea} onChange={handleChange} value={md}/>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box className={style.boxPreview} justifyContent>
                            <Markdown markdown={md}/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box justifyContent hidden={!printMode}>
                <Markdown markdown={md}/>
            </Box>
        </>

    )
}

const defaultMarkdown = `
## MdEditor的功能列表演示

# 标题H1

## 标题H2

### 标题H3

#### 标题H4

##### 标题H5

###### 标题H5

### 字符效果和横线等
----

~~删除线~~ <s>删除线（开启识别HTML标签时）</s>

*斜体字*      _斜体字_

**粗体**  __粗体__

***粗斜体*** ___粗斜体___

上标：X<sub>2</sub>，下标：O<sup>2</sup>

**缩写(同HTML的abbr标签)**
> 即更长的单词或短语的缩写形式，前提是开启识别HTML标签时，已默认开启

The <abbr title="Hyper Text Markup Language">HTML</abbr> specification is maintained by the <abbr title="World Wide Web Consortium">W3C</abbr>.
### 引用 Blockquotes

> 引用文本 Blockquotes

引用的行内混合 Blockquotes

> 引用：如果想要插入空白换行\`即<br />标签\`，在插入处先键入两个以上的空格然后回车即可，[普通链接](https://www.mdeditor.com/)。

### 锚点与链接 Links
[普通链接](https://www.mdeditor.com/)
[普通链接带标题](https://www.mdeditor.com/ "普通链接带标题")
直接链接：<https://www.mdeditor.com>
[锚点链接][anchor-id]
[anchor-id]: https://www.mdeditor.com/
[mailto:test.test@gmail.com](mailto:test.test@gmail.com)
GFM a-tail link @pandao
邮箱地址自动链接 test.test@gmail.com  www@vip.qq.com
> @pandao

### 多语言代码高亮 Codes

#### 行内代码 Inline code


执行命令：\`npm install marked\`

#### 缩进风格

即缩进四个空格，也做为实现类似 \`<pre>\` 预格式化文本 ( Preformatted Text ) 的功能。

    <?php
        echo "Hello world!";
    ?>
预格式化文本：

    | First Header  | Second Header |
    | ------------- | ------------- |
    | Content Cell  | Content Cell  |
    | Content Cell  | Content Cell  |

#### JS代码
\`\`\`javascript
function test() {
\tconsole.log("Hello world!");
}
\`\`\`
`;