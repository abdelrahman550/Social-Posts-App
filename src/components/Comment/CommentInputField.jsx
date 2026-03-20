import { Avatar } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Image, SendHorizontal, Smile } from 'lucide-react'
import { useContext, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import testImg from "/route.png"
import { authContext } from '../../Context/AuthContextProvider'
import InvalidCommentInput from './InvalidCommentInput'

export default function CommentInputField({postId}) {
    // Initializing States
    const [commentInputError , setCommentInputError] = useState(false)

    // Token Authentication Hook
    const { token } = useContext(authContext);

    // Using useRef Hook To Access The DOM To Get The Comment Text Input
    const commentTextInput = useRef(null)

    const queryClient = useQueryClient()

    // Create Comment Function
    function createComment() {

        const commentData = {
            content: commentTextInput.current.value
        }

        

            if(commentTextInput.current?.value?.length >= 2) {
                return axios.post(`https://route-posts.routemisr.com/posts/${postId}/comments`, commentData , {
                headers: {
                    token : token
                }
                })
            }else {
                throw new Error("Comment must be at least 2 characters");
            }

    }

    const { isPending , mutate } = useMutation({
        mutationFn: createComment,
        onSuccess : function() {
            setCommentInputError(false);
            commentTextInput.current.value = "";
            queryClient.invalidateQueries( ["All Comments" , postId] );
            toast.success("Comment Created Successfully!" , {
                position : "top-center"
            })
        },
        onError : function(error) {
            console.log("Error" , error);
            setCommentInputError(true);
        }
    })

    return (


    <>
    {commentInputError && <InvalidCommentInput />}
    <div className='w-full mt-3 flex gap-2'>
        
        <div><Avatar
                        isBordered={false}
                        radius="full"
                        size="sm"
                        //   src={commentData?.commentCreator?.photo}
                        src={testImg}
                        />
        </div>
        <div className='px-2.5 py-1.5 rounded-2xl bg-[#F0F2F5] w-full border border-slate-200 focus-within:border-[#c7dafc] focus-within:bg-white flex flex-col gap-1'>
            <textarea
                ref={commentTextInput}
                placeholder='Comment As User'
                rows='1'
                className='max-h-35 min-h-10 w-full scrollbar-hide resize-none bg-transparent px-2 py-1.5 text-sm leading-5 outline-none placeholder:text-slate-500'
            ></textarea>
            <div className='mt-1 flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                    <label className='comment-input-btn hover:text-emerald-600'>
                        <Image size={16} />
                        <input type='file' className='hidden' accept="image/*"/>
                    </label>
                    <button type='button' className='comment-input-btn hover:text-amber-500'><Smile size={16} /></button>
                </div>
                <button className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] text-white shadow-sm transition hover:bg-[#166fe5] cursor-pointer disabled:cursor-not-allowed disabled:bg-[#9ec5ff] disabled:opacity-100' onClick={mutate}>{ isPending ? "..." : <SendHorizontal size={16} />}</button>
            </div>

        </div>
    </div>
    </>
  )
}
