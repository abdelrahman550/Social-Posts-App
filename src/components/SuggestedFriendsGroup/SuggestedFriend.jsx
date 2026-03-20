import { Avatar } from '@heroui/react'
import { UserPlus } from 'lucide-react'

export default function SuggestedFriend({personData}) {
  const userName = personData?.username || "Default User"
  return (
    <div className='p-3 border border-slate-200 rounded-xl flex flex-col'>
              <div className='flex justify-between items-center'>
                <div className='flex gap-3'>
                    <Avatar
                        isBordered={false}
                        radius="full"
                        size="sm"
                        src={personData?.photo}
                        />
                        <div className='flex flex-col'>
                            <span className='truncate text-sm font-bold text-slate-900 hover:underline'>{personData?.name}</span>
                            <span className='truncate text-xs text-slate-500'>@{userName}</span>
                        </div>
                </div>
                <div className='inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff] h-fit'>
                    <UserPlus size={14} />
                    <span>Follow</span>
                </div>
              </div>
              <span className='rounded-full bg-slate-100 px-2 py-0.5 w-fit text-[11px] mt-2'>{personData?.followersCount} followers</span>
            </div>
  )
}
