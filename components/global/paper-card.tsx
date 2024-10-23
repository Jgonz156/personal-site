import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  CardOverflow,
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Link,
  Modal,
  ModalDialog,
  Sheet,
  Typography,
} from "@mui/joy"
import { useState } from "react"
import FeedIcon from "@mui/icons-material/Feed"
import RouterLink from "next/link"

export default function PaperCard({
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
      <Card orientation="horizontal" variant="soft" sx={{ width: 600 }}>
        <CardOverflow>
          <AspectRatio ratio="8.5/11" sx={{ minWidth: 100 }}>
            <img src={imageSlug} loading="lazy" alt="" />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Link overlay onClick={() => setModalVisibility(true)} />
          <Sheet
            variant="soft"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Link overlay onClick={() => setModalVisibility(true)} />
            <Typography>{title}</Typography>
            {authors.map((author, i) => (
              <Chip color="primary" key={i}>
                {author}
              </Chip>
            ))}
          </Sheet>
        </CardContent>
      </Card>
      <Modal open={modalVisibility} onClose={() => setModalVisibility(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <FeedIcon />
            Paper Information
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
