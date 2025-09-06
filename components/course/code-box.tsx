import { Sheet } from "@mui/joy"
import Editor from "@monaco-editor/react"
export default function CodeBox({
  code,
  line,
  width,
  height,
}: {
  code: string
  line?: number
  width?: string
  height?: string
}) {
  return (
    <Sheet
      color="neutral"
      variant="soft"
      sx={{
        height: "100%",
        width: "100%",
        p: 4,
        borderRadius: 12,
      }}
    >
      <Editor
        height={height ? height : "80vh"}
        width={width ? width : "100%"}
        defaultLanguage="python"
        defaultValue={code}
        theme="vs-dark"
        line={line}
        options={{ readOnly: true, minimap: { enabled: false } }}
      />
    </Sheet>
  )
}
