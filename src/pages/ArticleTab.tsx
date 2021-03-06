import React, {useEffect, useState} from "react";
import {Box, createStyles, Divider, Grid, ListItem, Paper, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Markdown from "../highlight/Markdown";
import {getArticleDetail} from "../api/Api";
import {Article} from "../api/model";
import {timeStampSecToDate} from "../utils/TimeUtils";
import {RouteComponentProps, withRouter} from "react-router";
import {getCookie, setCookie} from "../utils/Cookies";
import {isMobile} from "../utils/Utils";

const useStyle = makeStyles((theme: Theme) => createStyles({
    root: {
        marginBottom: isMobile() ? theme.spacing(2) : theme.spacing(4)
    },
    titleBox: {
        padding: isMobile() ? theme.spacing(2) : theme.spacing(4),
        paddingBottom: theme.spacing(2)
    },
    title: {
        paddingLeft: theme.spacing(2),
        paddingRight: isMobile() ? theme.spacing(2) : theme.spacing(4),
        paddingTop: theme.spacing(2)
    },
    articleBody: {
        paddingLeft: isMobile() ? theme.spacing(2) : theme.spacing(4),
        paddingRight: isMobile() ? theme.spacing(2) : theme.spacing(4),
        paddingBottom: isMobile() ? theme.spacing(2) : theme.spacing(4)
    },
    sideCard: {
        padding: theme.spacing(1)
    },
    fixedSideCard: {
        position: "fixed",
        top: "60px",
        width: "250px"
    },
    catalog: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1)
    },
    ul: {
        marginTop: "0px",
        marginLeft:theme.spacing(2),
        marginRight:theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    a: {
        color: theme.palette.text.secondary,
        cursor: "pointer",
        display: "inline-block",
        lineHeight: "25px",
        textDecoration: "none",
        "&:hover": {
            color: theme.palette.info.main
        }
    },
    catalogHeading1: {}, catalogHeading2: {
        margin:"0px",
        backgroundColor:theme.palette.background.default
    }, catalogHeading3: {
        margin:"0px 16px",
    }, catalogHeading4: {}
}));

let emptyArticle: Article;

interface Catalog {
    name: string
    children: Catalog[]
}

interface Heading {
    index: any,
    head: string,
    level: number
}

const ArticleTab = withRouter((props: RouteComponentProps) => {

        const [article, setArticle] = useState(emptyArticle);
        const [fixedSide, setFixedSide] = useState(false);

        useEffect(() => {
            let param = props.match.params as { id: number };
            let isRead = getCookie(`read_${param.id}`);
            const subscription = getArticleDetail(param.id, isRead === null)
                .subscribe(response => {
                    setArticle(response.data);
                    setCookie(`read_${param.id}`, "1", 1);
                }, error => {
                    console.log(error)
                });
            return () => {
                if (!subscription.closed) {
                    subscription.unsubscribe()
                }
            }
            // eslint-disable-next-line
        }, []);

        let sideInfoCard: Element | null;
        const scrollEventListener = () => {
            if (sideInfoCard === undefined || sideInfoCard === null) {
                sideInfoCard = window.document.querySelector(".main-content");
            }
            if (sideInfoCard !== undefined && sideInfoCard !== null) {
                const top = sideInfoCard.getBoundingClientRect().top;
                setFixedSide(top < 60)
            }
        };
        useEffect(() => {
            window.addEventListener('scroll', scrollEventListener);
            return () => {
                window.removeEventListener("scroll", scrollEventListener)
            }
        }, []);

        const styles = useStyle();
        if (article === undefined || article === null) {
            return (<div/>)
        } else {

            let heads = findHeading(article.content, /^# ([^\n]+)$/gmi, 1);
            heads = heads.concat(findHeading(article.content, /^## ([^\n]+)$/gmi, 2));
            heads = heads.concat(findHeading(article.content, /^### ([^\n]+)$/gmi, 3));
            heads = heads.concat(findHeading(article.content, /^#### ([^\n]+)$/gmi, 3));
            heads = quickSort(heads);

            const infos = [
                `分类 : ${article.category_name}`,
                `作者 : ${article.author_name}`,
                `喜欢 / 浏览 : ${article.likes} / ${article.views}`,
                `发布时间 : ${timeStampSecToDate(article.created_at)}`,
                `字数 : ${article.content.length}`
            ];
            const onCatalogClick = (catalog: string) => {
                let name = catalog.replace(/[. '",~!@#$%^&*()_+=\-/\\]/gmi, "-");
                let anchor: any = document.querySelector(`#${name}`);
                if (anchor !== null) {
                    // @ts-ignore
                    window.document.scrollingElement.scrollTop = anchor.offsetTop - 100;
                    document.body.scrollTop = anchor.offsetTop;
                }
            };

            return (
                <Grid container justify={"center"} spacing={1}>
                    <Grid item={true} className={`${styles.root} main-content`} xs={12} md={9}>
                        <Paper elevation={1}>
                            <Box className={styles.titleBox}>
                                <Typography variant={"h6"} component={"span"} gutterBottom align={"justify"}>
                                    {article.title}
                                </Typography>
                            </Box>
                            <Divider light={true} variant="middle"/>
                            <br/>
                            <Box className={styles.articleBody}>
                                <Markdown markdown={article.content}/>
                            </Box>
                        </Paper>

                        <Paper elevation={1} hidden>
                            <Box className={styles.articleBody}>
                                <Typography variant={"h6"} component={"span"} align={"justify"}>
                                    Comment
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item={true} xs={12} md={3}>
                        <Grid item={true} className={fixedSide ? styles.fixedSideCard : ""}>
                            <Paper elevation={1} className={styles.sideCard}>
                                {infos.map((value) => (<ListItem key={value}>{value}</ListItem>))}
                            </Paper>
                            <Paper elevation={1} className={styles.catalog}>
                                <ListItem>目录</ListItem>
                                <div className={styles.ul}>
                                    {heads.map((value) => (
                                        <p key={value.head}
                                            className={value.level === 2 ? styles.catalogHeading2 : styles.catalogHeading3}>
                                            <Typography component={"span"} variant={"body2"} className={`${styles.a} ${value}`}
                                               onClick={() => {onCatalogClick(value.head)}}>{value.head}</Typography>
                                        </p>))}
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            )
        }
    }
);

function findHeading(content: string, regex: RegExp, level: number): Heading[] {
    let find = regex.exec(content);
    let headings: Heading[] = [];
    while (find !== null) {
        headings.push({index: find.index, head: find[1], level: level});
        find = regex.exec(content);
    }
    return headings
}

function quickSort(arr: Heading[]): Heading[] {
    if (arr.length <= 1) {
        return arr;
    }
    let pivotIndex = Math.floor(arr.length / 2);
    let pivot = arr.splice(pivotIndex, 1)[0];
    let left: Heading[] = [];
    let right: Heading[] = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].index < pivot.index) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
}

export default ArticleTab

// eslint-disable-next-line
function getMarkdown(): string {
    return `
# 欢迎使用 Markdown在线编辑器 MdEditor

**Markdown是一种轻量级的「标记语言」**


![markdown](https://www.mdeditor.com/images/logos/markdown.png "markdown")


Markdown是一种可以使用普通文本编辑器编写的标记语言，通过简单的标记语法，它可以使普通文本内容具有一定的格式。它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面，Markdown文件的后缀名便是“.md”


## MdEditor是一个在线编辑Markdown文档的编辑器

*MdEditor扩展了Markdown的功能（如表格、脚注、内嵌HTML等等），以使让Markdown转换成更多的格式，和更丰富的展示效果，这些功能原初的Markdown尚不具备。*

> Markdown增强版中比较有名的有Markdown Extra、MultiMarkdown、 Maruku等。这些衍生版本要么基于工具，如~~Pandoc~~，Pandao；要么基于网站，如GitHub和Wikipedia，在语法上基本兼容，但在一些语法和渲染效果上有改动。

MdEditor源于Pandao的JavaScript开源项目，开源地址[Editor.md](https://github.com/pandao/editor.md "Editor.md")，并在MIT开源协议的许可范围内进行了优化，以适应广大用户群体的需求。向优秀的markdown开源编辑器原作者Pandao致敬。


![Pandao editor.md](https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png "Pandao editor.md")



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

#### HTML 代码 HTML codes
\`\`\`html
<!DOCTYPE html>
<html>
    <head>
        <mate charest="utf-8" />
        <meta name="keywords" content="Editor.md, Markdown, Editor" />
        <title>Hello world!</title>
        <style type="text/css">
            body{font-size:14px;color:#444;font-family: "Microsoft Yahei", Tahoma, "Hiragino Sans GB", Arial;background:#fff;}
            ul{list-style: none;}
            img{border:none;vertical-align: middle;}
        </style>
    </head>
    <body>
        <h1 class="text-xxl">Hello world!</h1>
        <p class="text-green">Plain text</p>
    </body>
</html>
\`\`\`
### 图片 Images

图片加链接 (Image + Link)：


[![](https://www.mdeditor.com/images/logos/markdown.png)](https://www.mdeditor.com/images/logos/markdown.png "markdown")

> Follow your heart.

----
### 列表 Lists

#### 无序列表（减号）Unordered Lists (-)

- 列表一
- 列表二
- 列表三

#### 无序列表（星号）Unordered Lists (*)

* 列表一
* 列表二
* 列表三

#### 无序列表（加号和嵌套）Unordered Lists (+)
+ 列表一
+ 列表二
    + 列表二-1
    + 列表二-2
    + 列表二-3
+ 列表三
    * 列表一
    * 列表二
    * 列表三

#### 有序列表 Ordered Lists (-)

1. 第一行
2. 第二行
3. 第三行

#### GFM task list

- [x] GFM task list 1
- [x] GFM task list 2
- [ ] GFM task list 3
    - [ ] GFM task list 3-1
    - [ ] GFM task list 3-2
    - [ ] GFM task list 3-3
- [ ] GFM task list 4
    - [ ] GFM task list 4-1
    - [ ] GFM task list 4-2

----

### 绘制表格 Tables

| 项目        | 价格   |  数量  |
| --------   | -----:  | :----:  |
| 计算机      | $1600   |   5     |
| 手机        |   $12   |   12   |
| 管线        |    $1    |  234  |

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

| Function name | Description                    |
| ------------- | ------------------------------ |
| \`help()\`      | Display the help window.       |
| \`destroy()\`   | **Destroy your computer!**     |

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |

| Item      | Value |
| --------- | -----:|
| Computer  | $1600 |
| Phone     |   $12 |
| Pipe      |    $1 |

----

#### 特殊符号 HTML Entities Codes

&copy; &  &uml; &trade; &iexcl; &pound;
&amp; &lt; &gt; &yen; &euro; &reg; &plusmn; &para; &sect; &brvbar; &macr; &laquo; &middot;

X&sup2; Y&sup3; &frac34; &frac14;  &times;  &divide;   &raquo;

18&ordm;C  &quot;  &apos;

[========]

### Emoji表情 :smiley:

> Blockquotes :star:

#### GFM task lists & Emoji & fontAwesome icon emoji & editormd logo emoji :editormd-logo-5x:

- [x] :smiley: @mentions, :smiley: #refs, [links](), **formatting**, and <del>tags</del> supported :editormd-logo:;
- [x] list syntax required (any unordered or ordered list supported) :editormd-logo-3x:;
- [x] [ ] :smiley: this is a complete item :smiley:;
- [ ] []this is an incomplete item [test link](#) :fa-star: @pandao;
- [ ] [ ]this is an incomplete item :fa-star: :fa-gear:;
    - [ ] :smiley: this is an incomplete item [test link](#) :fa-star: :fa-gear:;
    - [ ] :smiley: this is  :fa-star: :fa-gear: an incomplete item [test link](#);

#### 反斜杠 Escape

\\*literal asterisks\\*

[========]
### 科学公式 TeX(KaTeX)

$$E=mc^2$$

行内的公式$$E=mc^2$$行内的公式，行内的$$E=mc^2$$公式。

$$x > y$$

$$\\(\\sqrt{3x-1}+(1+x)^2\\)$$

$$\\sin(\\alpha)^{\\theta}=\\sum_{i=0}^{n}(x^i + \\cos(f))$$

多行公式：

\`\`\`math
\\displaystyle
\\left( \\sum\\_{k=1}^n a\\_k b\\_k \\right)^2
\\leq
\\left( \\sum\\_{k=1}^n a\\_k^2 \\right)
\\left( \\sum\\_{k=1}^n b\\_k^2 \\right)
\`\`\`
\`\`\`katex
\\displaystyle
    \\frac{1}{
        \\Bigl(\\sqrt{\\phi \\sqrt{5}}-\\phi\\Bigr) e^{
        \\frac25 \\pi}} = 1+\\frac{e^{-2\\pi}} {1+\\frac{e^{-4\\pi}} {
        1+\\frac{e^{-6\\pi}}
        {1+\\frac{e^{-8\\pi}}
         {1+\\cdots} }
        }
    }
\`\`\`
\`\`\`latex
f(x) = \\int_{-\\infty}^\\infty
    \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}
    \\,d\\xi
\`\`\`
### 分页符 Page break

> Print Test: Ctrl + P

[========]

### 绘制流程图 Flowchart

\`\`\`flow
st=>start: 用户登陆
op=>operation: 登陆操作
cond=>condition: 登陆成功 Yes or No?
e=>end: 进入后台

st->op->cond
cond(yes)->e
cond(no)->op
\`\`\`
[========]

### 绘制序列图 Sequence Diagram

\`\`\`seq
Andrew->China: Says Hello
Note right of China: China thinks\\nabout it
China-->Andrew: How are you?
Andrew->>China: I am good thanks!
\`\`\`
### End
    
    
    `
}