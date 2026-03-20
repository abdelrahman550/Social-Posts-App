import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { Bookmark, Ellipsis, Pencil, Trash2 } from "lucide-react";
import PostEditModal from "../PostEditModal/PostEditModal";

export default function PostCardDropDown({isAuthorized , deletePost}) {

  return (
    <>
    
      <div className="flex gap-1 items-center justify-center">
        <button className=" p-2 cursor-pointer hover:text-[#1877f2] transition rounded-full" ><Bookmark size={16} /></button>

        {isAuthorized && <>
        <PostEditModal />
        <button className="  p-2 cursor-pointer transition hover:text-rose-600 rounded-full" onClick={deletePost}><Trash2 size={16} /></button>
        </>}
      </div>

  </>
  );
}
