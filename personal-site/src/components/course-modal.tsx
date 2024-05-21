import Button from "@mui/joy/Button"
import Divider from "@mui/joy/Divider"
import DialogTitle from "@mui/joy/DialogTitle"
import DialogContent from "@mui/joy/DialogContent"
import DialogActions from "@mui/joy/DialogActions"
import Modal from "@mui/joy/Modal"
import ModalDialog from "@mui/joy/ModalDialog"
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"

export default function CourseModal({
  dispatchClose,
  visible,
}: {
  dispatchClose: () => void
  visible: boolean
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
            <Button variant="solid" color="primary" onClick={dispatchClose}>
              Head To Class!
            </Button>
            <Button variant="plain" color="neutral" onClick={dispatchClose}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  )
}
