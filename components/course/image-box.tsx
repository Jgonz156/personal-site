import { Sheet } from "@mui/joy"

export default function ImageBox({
  images,
}: {
  images: { url: string; caption: any }[]
}) {
  return (
    <Sheet
      color="neutral"
      variant="soft"
      sx={{
        p: 4,
        borderRadius: 12,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
      }}
    >
      {images.map(({ url, caption }, i) => (
        <Sheet color="neutral" variant="soft" key={i}>
          <img src={url} style={{ width: "100%", borderRadius: 12 }} />
          {caption}
        </Sheet>
      ))}
    </Sheet>
  )
}
