import { Sheet } from "@mui/joy"
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view"
import FolderIcon from "@mui/icons-material/Folder"
import { createSvgIcon } from "@mui/material"

const PythonFileIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // @ts-ignore
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 48 48"
    width="24px"
    height="24px"
  >
    <path
      fill="#0277BD"
      d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2H15.22h-4.35c-2.636,0-4.943,1.242-5.674,4.219c-0.826,3.417-0.863,5.557,0,9.125C5.851,32.005,7.294,34,9.931,34h3.632v-5.104c0-2.966,2.686-5.896,5.764-5.896h7.236c2.523,0,5-1.862,5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672C27.406,5.359,25.589,4.994,24.047,5z M19.063,9c0.821,0,1.5,0.677,1.5,1.502c0,0.833-0.679,1.498-1.5,1.498c-0.837,0-1.5-0.664-1.5-1.498C17.563,9.68,18.226,9,19.063,9z"
    />
    <path
      fill="#FFC107"
      d="M23.078,43c1.555-0.005,2.633-0.142,3.936-0.367c3.848-0.67,4.549-2.077,4.549-4.67V34h-9v-2h9.343h4.35c2.636,0,4.943-1.242,5.674-4.219c0.826-3.417,0.863-5.557,0-9.125C41.274,15.995,39.831,14,37.194,14h-3.632v5.104c0,2.966-2.686,5.896-5.764,5.896h-7.236c-2.523,0-5,1.862-5,4.377v8.586c0,2.439,1.759,4.263,4.218,4.672C19.719,42.641,21.536,43.006,23.078,43z M28.063,39c-0.821,0-1.5-0.677-1.5-1.502c0-0.833,0.679-1.498,1.5-1.498c0.837,0,1.5,0.664,1.5,1.498C29.563,38.32,28.899,39,28.063,39z"
    />
  </svg>,
  "PythonFile"
)

export default function DirectoryTree({
  filesAsJSON,
}: {
  filesAsJSON: {
    [folder: string]: { [files: string]: any }
  }
}) {
  return (
    <Sheet sx={{ display: "flex", justifyContent: "space-evenly" }}>
      <SimpleTreeView>
        {Object.entries(filesAsJSON).map(([folderName, files]) => (
          <TreeItem
            itemId={folderName}
            label={folderName}
            slots={{ icon: FolderIcon }}
          >
            {Object.entries(files).map(([fileName, _]) => (
              <TreeItem
                itemId={fileName}
                label={fileName}
                slots={{ icon: PythonFileIcon }}
              ></TreeItem>
            ))}
          </TreeItem>
        ))}
      </SimpleTreeView>
    </Sheet>
  )
}