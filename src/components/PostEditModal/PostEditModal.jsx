import {
  Card,
  CardBody,
  CardFooter,
  Modal,
  ModalContent,
  useDisclosure,
} from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image, Pencil, Send, Smile, X } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { authContext } from "../../Context/AuthContextProvider";
import { editPostAPI } from "../../Services/editPostAPI";
import { getWholePost } from "../../Services/getWholePost";

export default function PostEditModal({ postId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // States
  const [imageUrl, setImageUrl] = useState(null);
  const [body, setBody] = useState("");

  // Token Authentication Hook
  const { token } = useContext(authContext);

  // Hooks
  const queryClient = useQueryClient();

  const postImageInput = useRef(null);

  function previewImage() {
    const imageFile = postImageInput.current.files[0];
    const imagePath = URL.createObjectURL(imageFile);
    setImageUrl(imagePath);
  }

  function clearImageInput() {
    setImageUrl(null);
    postImageInput.current.value = "";
  }

  // Get Post Data To Put The Inputs In The fields
  const { data } = useQuery({
    queryFn: () => getWholePost(postId, token),
    queryKey: ["wholePost", postId],
  });

  function handleEdit(onClose) {
  if (!body && postImageInput.current.files.length === 0) {
    toast.error("Can Not Update An Empty Post", {
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
    if (data?.data?.data?.post) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBody(data.data.data.post.body || "");
      setImageUrl(data.data.data.post.image || null);
    }
  }, [data]);

const { mutate, isPending } = useMutation({
  mutationFn: () => editPostAPI(token, body, postImageInput, postId),
  onSuccess() {
    queryClient.invalidateQueries(["posts", token]);
    toast.success("Post Edited Successfully!", {
      position: "top-center",
    });
    clearImageInput();
    setBody("");
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
        className="cursor-pointer rounded-full p-2 transition hover:text-amber-300"
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
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={4}
                    className="..."
                  />
                  {imageUrl && (
                    <div className="relative">
                      <img
                        src={imageUrl}
                        className="mt-4 max-h-60 w-full rounded-lg object-cover"
                      />
                      <button
                        className="flex absolute cursor-not-allowed top-6 right-2 h-6 w-6 items-center justify-center rounded-full bg-black/30 text-slate-700"
                        disabled
                        onClick={clearImageInput}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </CardBody>

                <div className="flex items-center justify-center">
                  <div className="mx-4 h-px w-full border-t border-slate-300"></div>
                </div>

                <CardFooter className="flex items-center justify-between p-4 pt-3">
                  <div className="flex items-center gap-1">
                    <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-emerald-600 transition hover:bg-slate-100">
                      <Image size={16} />
                      <span className="text-slate-600">Photo/video</span>
                      <input
                        onChange={previewImage}
                        ref={postImageInput}
                        type="file"
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                    <button
                      type="button"
                      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-amber-500 transition hover:bg-slate-100"
                    >
                      <Smile size={16} />
                      <span className="text-slate-600">Feeling/activity</span>
                    </button>
                  </div>
                  <button
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff] disabled:opacity-100"
                    disabled={isPending}
                    onClick={() => handleEdit(onClose)}
                  >
                    {isPending ? "Saving..." : "Save"}
                    <Send size={16} />
                  </button>
                </CardFooter>
              </Card>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
