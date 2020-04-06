import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {PrismLight as SyntaxHighlighter} from "react-syntax-highlighter";
// @ts-ignore
import {java, javascript, jsx, kotlin} from 'react-syntax-highlighter/dist/esm/languages/prism';
import {coy} from "react-syntax-highlighter/dist/esm/styles/prism";

export default class CodeBlock extends PureComponent<{ language: string, value: string }, any> {

    static propTypes = {
        value: PropTypes.string.isRequired,
        language: PropTypes.string
    };

    static defaultProps = {
        language: null
    };

    componentDidMount(): void {
        SyntaxHighlighter.registerLanguage("jsx", jsx);
        SyntaxHighlighter.registerLanguage("javascript", javascript);
        SyntaxHighlighter.registerLanguage("java", java);
        SyntaxHighlighter.registerLanguage("kotlin", kotlin);
    }

    render(): any {
        const {language, value} = this.props;
        return (
            <figure className="highlight">
                <SyntaxHighlighter language={language} style={coy}>
                    {value}
                </SyntaxHighlighter>
            </figure>
        )
    }
}