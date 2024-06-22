type SpacingProps = {
  height: number;
};

function Spacing({ height }: SpacingProps) {
  return <div style={{ height: height, width: "100%" }} />;
}

export default Spacing;
