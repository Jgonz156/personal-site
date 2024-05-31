import Button from "@mui/joy/Button"
import Divider from "@mui/joy/Divider"
import DialogTitle from "@mui/joy/DialogTitle"
import DialogContent from "@mui/joy/DialogContent"
import DialogActions from "@mui/joy/DialogActions"
import Modal from "@mui/joy/Modal"
import ModalDialog from "@mui/joy/ModalDialog"
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"
import { Link } from "@mui/joy"
import { Link as RouterLink } from "react-router-dom"

export default function CourseModal({
  dispatchClose,
  visible,
  slug,
}: {
  dispatchClose: () => void
  visible: boolean
  slug: string
}) {
  return (
    <>
      <Modal open={visible} onClose={dispatchClose}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <LibraryBooksIcon />
            Course Information
          </DialogTitle>
          <Divider />
          <DialogContent>Description</DialogContent>
          <DialogActions>
            <Link component={RouterLink} to={slug}>
              <Button variant="solid" color="primary">
                Head To Class!
              </Button>
            </Link>
            <Button variant="plain" color="neutral" onClick={dispatchClose}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  )
}
