import Typography, { TypographyProps } from "@mui/material/Typography";
import { ReactNode } from "react";

interface MaxLineTypographyProps extends TypographyProps {
  maxLine: number;
  children: ReactNode;
}

const MaxLineTypography = ({
  maxLine,
  children,
  ...others
}: MaxLineTypographyProps) => {
  console.log(others, 14);

  return (
    <Typography
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: maxLine,
        WebkitBoxOrient: "vertical",
      }}
      {...others}
    >
      {children}
    </Typography>
  );
};

export default MaxLineTypography;
