import {
  Card,
  CardBody,
  Modal,
  ModalContent,
  useDisclosure,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Send } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authContext } from "../../Context/AuthContextProvider";
import { editCommentAPI } from "../../Services/editCommentAPI";

export default function CommentEditModal({ postId, commentData }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // States
  const [content, setContent] = useState("");

  // Token Authentication Hook
  const { token } = useContext(authContext);

  // Hooks
  const queryClient = useQueryClient();

  function handleEdit(onClose) {
    if (!content) {
      toast.error("Can Not Update An Empty Comment", {
        position: "top-center",
      });
      return;
    }

    mutate(undefined, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  useEffect(() => {
    if (commentData?.content) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setContent(commentData?.content || "");
    }
  }, [commentData]);

  const { mutate, isPending } = useMutation({
    mutationFn: () => editCommentAPI(token, content, postId, commentData),
    onSuccess() {
      queryClient.invalidateQueries(["All Comments", postId]);
      toast.success("Comment Edited Successfully!", {
        position: "top-center",
      });
      setContent("");
    },
    onError(error) {
      toast.error(`${error?.response?.data?.message}`, {
        position: "top-center",
      });
    },
  });

  return (
    <>
      <button
        className="cursor-pointer rounded-full p-2 text-slate-500 transition hover:text-amber-300"
        onClick={onOpen}
      >
        <Pencil size={16} />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Card className="h-full w-full rounded-xl shadow">
                <CardBody className="text-foreground max-w-full overflow-visible p-4 text-sm leading-relaxed whitespace-pre-wrap">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    className="..."
                  />
                </CardBody>

                <div className="flex items-center justify-center">
                  <div className="mx-4 h-px w-full border-t border-slate-300"></div>
                </div>

                <div className="flex justify-end p-4">
                  <button
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff] disabled:opacity-100"
                    disabled={isPending}
                    onClick={() => handleEdit(onClose)}
                  >
                    {isPending ? "Saving..." : "Save"}
                    <Send size={16} />
                  </button>
                </div>
              </Card>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
