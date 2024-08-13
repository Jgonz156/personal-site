import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Sheet,
  Typography,
} from "@mui/joy"
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects"

export default function PhilosophyBreak({
  qa,
}: {
  qa: { question: string; answer: any }[]
}) {
  return (
    <Sheet
      color="primary"
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
      <Typography level="h1">Philosophy Break</Typography>
      <EmojiObjectsIcon />
      <AccordionGroup
        color="primary"
        variant="soft"
        transition="0.4s"
        sx={{ borderRadius: 12 }}
      >
        {qa.map(({ question, answer }) => (
          <Accordion key={question}>
            <AccordionSummary>{question}</AccordionSummary>
            <AccordionDetails>{answer}</AccordionDetails>
          </Accordion>
        ))}
      </AccordionGroup>
    </Sheet>
  )
}
