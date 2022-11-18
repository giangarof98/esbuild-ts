import Editor from "@monaco-editor/react";

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({onChange, initialValue}) => {    

    const onEditorMount=(getValue: () => string, monacoEditor: any) => {
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue())
        }) 

    }
    return <Editor
        editorDidMount={onEditorMount}
        value={initialValue} 
        language="javascript" 
        theme="dark" 
        height='400px' 
        options={{
            wordWrap: 'on',
            minimap: {enabled: false},
            showUnused: false,
            folding: false,
            lineNumbersMinChars:3,
            fontSize:16,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            
        }}  /> 
      
};

export default CodeEditor;