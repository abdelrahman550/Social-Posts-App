import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Users } from "lucide-react";
import { useContext } from "react";
import { authContext } from "../../Context/AuthContextProvider";
import SuggestedFriend from "./SuggestedFriend";
import SuggestedFriendSkeleton from "./SuggestedFriendSkeleton";
export default function SuggestedFriendsGroup() {
  // Token Authentication Hook
  const { token } = useContext(authContext);

  function getSuggestedPeople() {
    return axios.get(
      "https://route-posts.routemisr.com/users/suggestions?page=1&limit=6",
      {
        headers: {
          token: token,
        },
      },
    );
  }

  const { data, isLoading } = useQuery({
    queryFn: getSuggestedPeople,
    queryKey: ["suggestedPeople", token],
    enabled: !!token,
  });

  const suggestions = data?.data?.data?.suggestions;
  const numberOfSkeletons = 5;

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Users className="text-[#1877F2]" size={18} />
        <h2 className="font-extrabold">Suggested Friends</h2>
      </div>

      <div className="flex flex-col gap-2.5">
        {isLoading
          ? Array.from({ length: numberOfSkeletons }).map((_, index) => (
              <SuggestedFriendSkeleton key={index} />
            ))
          : suggestions?.map((person) => (
              <SuggestedFriend personData={person} key={person?._id} />
            ))}
      </div>
    </div>
  );
}
