import Button from "@mui/joy/Button"
import Divider from "@mui/joy/Divider"
import DialogTitle from "@mui/joy/DialogTitle"
import DialogContent from "@mui/joy/DialogContent"
import DialogActions from "@mui/joy/DialogActions"
import Modal from "@mui/joy/Modal"
import ModalDialog from "@mui/joy/ModalDialog"
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"
import { Link } from "@mui/joy"
import RouterLink from "next/link"

export default function CourseModal({
  dispatchClose,
  visible,
  slug,
  children,
}: Readonly<{
  dispatchClose: () => void
  visible: boolean
  slug: string
  children: React.ReactNode
}>) {
  return (
    <Modal open={visible} onClose={dispatchClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <LibraryBooksIcon />
          Course Information
        </DialogTitle>
        <Divider />
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <RouterLink href={slug}>
            <Button variant="solid" color="primary">
              Head To Class!
            </Button>
          </RouterLink>
          <Button variant="plain" color="neutral" onClick={dispatchClose}>
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  )
}
