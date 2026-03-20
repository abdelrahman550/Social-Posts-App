import { Avatar, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Earth, Image, Send, Smile, X } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import defaultImg from "/default-profile.png";
import { authContext } from "../../Context/AuthContextProvider";
import { createPost } from "../../Services/createPost";

export default function PostCreationField({ userData, isUserDataLoading }) {
  // States
  const [imageUrl, setImageUrl] = useState(null);

  // Token Authentication Hook
  const { token } = useContext(authContext);

  // Hooks
  const queryClient = useQueryClient()

  const firstName = userData?.name?.split(" ")[0];


  const postTextInput = useRef(null);
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

  function handlePostCreation() {
    if(!postTextInput.current.value && postImageInput.current.files.length == 0) {
      toast.error('Can Not Create An Empty Post' , {
                position : "top-center"
            })
      return;
    }
    mutate()
  }

  const { mutate, isPending } = useMutation({
    mutationFn:() => createPost(token , postTextInput , postImageInput),
    onSuccess() {
      queryClient.invalidateQueries(["posts" , token])
      toast.success("Post Created Successfully!", {
        position: "top-center",
      });
      clearImageInput();
      postTextInput.current.value = ""

    },
    onError(error) {
            toast.error(`${error?.response?.data?.message}` , {
                position : "top-center"
            })
    },
  });

  return (
    <Card className="max-h-max xl:h-full w-full rounded-xl shadow">
      <CardHeader className="justify-between p-4 pb-3">
        <div className="flex gap-3">
          <Avatar
            isBordered={false}
            radius="full"
            size="md"
            src={isUserDataLoading ? defaultImg : userData?.photo}
          />
          <div className="flex flex-col items-start justify-center gap-1">
            <h4 className="text-foreground truncate font-extrabold hover:underline">
              {isUserDataLoading ? "You" : userData?.name}
            </h4>
            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              <span className="flex items-center gap-1">
                <Earth size={12} />
                Public
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="text-foreground max-w-full overflow-visible p-4 pt-0 text-sm leading-relaxed whitespace-pre-wrap">
        <textarea
          ref={postTextInput}
          rows={4}
          placeholder={`What's on your mind, ${isUserDataLoading ? "You" : firstName}?`}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 transition outline-none focus:border-[#1877f2] focus:bg-white"
        ></textarea>
        {imageUrl && (
          <div className="relative">
            <img
              src={imageUrl}
              className="mt-4 max-h-60 w-full rounded-lg object-cover"
            />
            <span
              className="absolute top-6 right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black/80 text-white"
              onClick={clearImageInput}
            >
              <X size={14} />
            </span>
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
          onClick={handlePostCreation}
        >
          {isPending ? "Posting..." : "Post"}
          <Send size={16} />
        </button>
      </CardFooter>
    </Card>
  );
}