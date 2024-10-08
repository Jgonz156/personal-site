import { Sheet } from "@mui/joy"
import Editor from "@monaco-editor/react"
export default function CodeBox({
  code,
  line,
}: {
  code: string
  line?: number
}) {
  return (
    <Sheet
      color="neutral"
      variant="soft"
      sx={{
        p: 4,
        borderRadius: 12,
      }}
    >
      <Editor
        height="90vh"
        defaultLanguage="python"
        defaultValue={code}
        theme="vs-dark"
        line={line}
        options={{ readOnly: true, minimap: { enabled: false } }}
      />
    </Sheet>
  )
}
