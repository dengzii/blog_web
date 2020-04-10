import React from "react";
import {createStyles, Paper, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Markdown from "../highlight/Markdown";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(4)
    }
}));

function AboutMe() {

    const style = useStyles();

    const aboutMe = `
# 关于我

##### 我是 dengzi, 一个怀揣梦想, 热爱编码的 95 后程序员, 目前在珠海从事安卓开发工作. 
##### 但我的兴趣不局限于Android, 同时也对 Python, TypeScript, React, Go 等充满好奇.
##### 除了遨游代码的海洋, 我还喜欢 C4D 和 PR, 电影, 音乐和摄影.

> 联系方式: **master#dengzii.com**  (replace # to @)

---

# 关于博客

##### 博客主要用于记录, 总结, 分享我在学习过程中的看法及经验.

##### 本博客使用 **[React](https://zh-hans.reactjs.org/)**, **[MaterialUI](https://material-ui.com/)**, **[TypeScript](https://www.typescriptlang.org/)**, **[Iris](https://iris-go.com/)** 搭建在阿里云. 博客源码托管在 [GitHub](https://github.com/dengzii/blog_web).

##### 除了特殊说明, 文章皆为原创, 原创文章采用 [知识共享署名4.0](https://creativecommons.org/licenses/by/4.0/) 国际许可协议进行许可.

---

# 博客简史

- 2020-02: 使用 React+Iris 重写
- 2019-02: 修复加载更多出现重复的BUG
- 2018-09: 更新了一些细节, 适配移动端, 收录了一些大佬的友链
- 2017-11: 添加 GitTalk 评论, 更漂亮的界面, 优化细节
- 2017-09: 再次优化, 确定结构
- 2017-06: 上线第一个版本
- 2017-04: 开始使用 django 搭建
`;

    return (
        <Paper className={style.root}>
            <Markdown markdown={aboutMe}/>
        </Paper>
    )
}


export default AboutMe