import { Components } from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const CustomRenderers: Partial<Components> = {
  h1(props) {
		const {node, ...rest} = props
		return <h1 className="text-3xl font-bold" {...rest} />
	},
	h2(props) {
		const {node, ...rest} = props
		return <h2 className="text-2xl font-bold" {...rest} />
	},
	h3(props) {
		const {node, ...rest} = props
		return <h3 className="text-1xl font-bold" {...rest} />
	},
	h4(props) {
		const {node, ...rest} = props
		return <h4 className="text-xl font-bold" {...rest} />
	},
	code(props){
		const {node, ...rest} = props;
		let c = rest.children?.toString();
		return <SyntaxHighlighter children={c as string} language={rest.className?.split('-')[1]} style={dracula}></SyntaxHighlighter>
	}
};
