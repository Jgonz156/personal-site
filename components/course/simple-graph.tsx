import { useContext, useRef, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { LightMode, SiteContext } from "@/contexts/site-context";
import { Paper } from "@mui/material";
import * as d3 from "d3-force";

export default function SimpleGraph({
  graph,
}: {
  graph: {
    nodes: { name: string }[];
    links: { source: string; target: string }[];
  };
}) {
  const { settings } = useContext(SiteContext);
  const fgRef = useRef<any>();

  const cleanGraph = {
    ...graph,
    nodes: graph.nodes.map((node) => ({ ...node, id: node.name })),
  };

  useEffect(() => {
    const fg = fgRef.current;
    if (fg) {
      fg.d3Force("center", d3.forceCenter(0, 0));
      fg.d3Force("gravity", d3.forceManyBody().strength(20));
    }
  }, []);

  return (
    <Paper
      variant="outlined"
      sx={{
        borderWidth: 4,
        height: "50vh",
        width: "50vw",
      }}
    >
      <ForceGraph2D
        ref={fgRef}
        graphData={cleanGraph}
        nodeLabel="name"
        width={window.innerWidth * 0.5}
        height={window.innerHeight * 0.5}
        nodeCanvasObjectMode={() => "after"}
        nodeCanvasObject={(nodeObj, ctx) => {
          const radius = 5;
          ctx.beginPath();
          // @ts-ignore
          ctx.arc(nodeObj.x, nodeObj.y, radius, 0, 2 * Math.PI, false);
          ctx.fillStyle =
            nodeObj.color ||
            (settings.LightMode === LightMode.Light ? "#90ee90" : "#006400");
          ctx.fill();
          ctx.font = `6px Sans-Serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle =
            settings.LightMode === LightMode.Light ? "black" : "white";
          // @ts-ignore
          ctx.fillText(nodeObj.name, nodeObj.x, nodeObj.y);
        }}
        linkCanvasObjectMode={() => "after"}
        linkCanvasObject={(link, ctx) => {
          ctx.beginPath();
          // @ts-ignore
          ctx.moveTo(link.source.x, link.source.y);
          // @ts-ignore
          ctx.lineTo(link.target.x, link.target.y);
          ctx.strokeStyle =
            settings.LightMode === LightMode.Light ? "black" : "white";
          ctx.lineWidth = 1;
          ctx.stroke();
        }}
      />
    </Paper>
  );
}
