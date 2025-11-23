"use client";

import { FaEye } from "react-icons/fa";
import { Button } from "./Button";

export default function CommentBtn({ comment }) {
  return (
    <Button onClick={() => alert(comment)} variant="outline" size="xs">
      <FaEye />
    </Button>
  );
}
