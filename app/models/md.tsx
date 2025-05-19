import { Components } from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const catppuccinMocha: any = {
  'code[class*="language-"]': {
    background: '#1e1e2e',
    color: '#cdd6f4',
    fontFamily: 'Fira Code, Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '1em',
    lineHeight: '1.5em',
  },
  'pre[class*="language-"]': {
    background: '#1e1e2e',
    padding: '1em',
    borderRadius: '8px',
    overflow: 'auto',
  },
  comment: { color: '#6c7086', fontStyle: 'italic' },
  punctuation: { color: '#89b4fa' },
  property: { color: '#f38ba8' },
  selector: { color: '#f38ba8' },
  operator: { color: '#f5c2e7' },
  keyword: { color: '#cba6f7', fontWeight: 'bold' },
  function: { color: '#89dceb' },
  variable: { color: '#fab387' },
  string: { color: '#a6e3a1' },
  char: { color: '#a6e3a1' },
  number: { color: '#fab387' },
  boolean: { color: '#f38ba8' },
  tag: { color: '#f5c2e7' },
  attrName: { color: '#74c7ec' },
  attrValue: { color: '#a6e3a1' },
  className: { color: '#89dceb' },
  regex: { color: '#f2cdcd' },
  important: { color: '#f38ba8', fontWeight: 'bold' },
  deleted: { color: '#f38ba8' },
  inserted: { color: '#a6e3a1' },
  entity: { color: '#94e2d5' },
};

export const CustomRenderers: Partial<Components> = {
  h1(props) {
		const {node, ...rest} = props
		return <h1 className="text-3xl mb-1 font-bold" {...rest} />
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
		return <div className="py-4 select-text"><SyntaxHighlighter children={c as string} language={rest.className?.split('-')[1]} style={catppuccinMocha}></SyntaxHighlighter></div>
	}
};
