import {
  Button,
  Card,
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Link,
  Modal,
  ModalDialog,
  Sheet,
} from "@mui/joy"
import { useState } from "react"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import RouterLink from "next/link"

export default function BookCard({
  title,
  authors,
  pages,
  abstract,
  link,
  imageSlug,
}: {
  title: string
  authors: string[]
  pages: string | number
  abstract: any
  link?: string
  imageSlug: string
}) {
  const [modalVisibility, setModalVisibility] = useState(false)
  return (
    <>
      <Card variant="soft" sx={{ width: 300 }}>
        <img src={imageSlug} loading="lazy" alt="" />
        <Link overlay onClick={() => setModalVisibility(true)} />
      </Card>
      <Modal open={modalVisibility} onClose={() => setModalVisibility(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <AutoStoriesIcon />
            Book Information
          </DialogTitle>
          <Divider />
          <DialogContent>
            {title}
            <Divider>
              <Chip>Abstract</Chip>
            </Divider>
            {abstract}
            <Divider />
            <Sheet
              sx={{ display: "flex", gap: 1, justifyContent: "space-between" }}
            >
              {authors.map((author, i) => (
                <Chip color="primary" key={i}>
                  {author}
                </Chip>
              ))}
              <Chip color="success">Pages: {pages}</Chip>
            </Sheet>
          </DialogContent>
          <DialogActions>
            {link ? (
              <RouterLink href={link}>
                <Button variant="solid" color="primary">
                  Head To Source!
                </Button>
              </RouterLink>
            ) : (
              <></>
            )}

            <Button
              variant="plain"
              color="neutral"
              onClick={() => setModalVisibility(false)}
            >
              Close
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  )
}
