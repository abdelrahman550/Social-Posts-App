import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

import { Ellipsis, Pencil, Trash2 } from "lucide-react";

export default function CommentDropDown({ handelCommentDelete }) {
  return (
    <Dropdown
      className="rounded-xl"
      classNames={{
        content: "min-w-32",
      }}
    >
      <DropdownTrigger>
        <Button className="flex h-fit min-w-fit items-center justify-center gap-0 rounded-full bg-transparent p-1.5 text-slate-500 transition hover:bg-[#F1F5F9]">
          <span>
            <Ellipsis size={18} />
          </span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Profile Actions"
        variant="flat"
        classNames={{ base: "p-0.5" }}
      >
        <DropdownItem
          key="Save Post"
          startContent={<Pencil size={14} />}
          classNames={{
            title: "text-xs font-semibold text-slate-800",
          }}
        >
          Edit
        </DropdownItem>
        <DropdownItem
          startContent={<Trash2 size={16} />}
          key="Delete Post"
          color=""
          classNames={{
            base: "text-sm font-semibold text-rose-600 hover:bg-rose-50",
            title: "text-xs font-semibold",
          }}
          onPress={handelCommentDelete}
        >
          Delete Comment
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
