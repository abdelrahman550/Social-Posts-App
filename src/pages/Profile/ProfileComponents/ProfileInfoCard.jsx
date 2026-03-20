import React from 'react'
import { Mail, Users, UserRound, BookMarked } from "lucide-react";
import MiniStatCard from "../ProfileComponents/MiniStatCard";
import StatCard from "../ProfileComponents/StatCard";
import defaultImg from "/default-profile.png"

export default function ProfileInfoCard({userData , postsLength}) {
  return (
        <div className="mx-auto mb-6 w-full max-w-7xl overflow-hidden rounded-[28px] bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
          {userData?.cover ? (
            <img
              src={userData?.cover}
              alt=""
              className="max-h-60 w-full object-cover"
            />
          ) : (
            <div className="h-64 w-full bg-linear-to-br from-[#1f2b46] via-[#21446e] to-[#7fb0dc]" />
          )}

          <div className="relative px-5 pb-6 md:px-10">
            <div className="relative -mt-24 rounded-[28px] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:p-8">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-col gap-5 md:flex-row md:items-center">
                  <div className="h-36 w-36 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-[0_10px_25px_rgba(59,130,246,0.18)]">
                    <img
                      src={userData?.photo ? userData?.photo : defaultImg }
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                      {userData?.name ? userData?.name : "You"}
                    </h1>
                    <p className="mt-2 text-2xl text-slate-500">
                      @{userData?.username ? userData?.username : "You"}
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                      <Users size={16} />
                      Route Posts member
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:min-w-155">
                  <StatCard
                    label="FOLLOWERS"
                    value={userData?.followersCount || 0}
                  />
                  <StatCard
                    label="FOLLOWING"
                    value={userData?.followingCount || 0}
                  />
                  <StatCard
                    label="BOOKMARKS"
                    value={userData?.bookmarksCount || 0}
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <div className="rounded-[22px] border border-slate-200 bg-[#f8fafc] p-5 xl:col-span-2">
                  <h2 className="text-lg font-bold text-slate-900">About</h2>

                  <div className="mt-5 space-y-4 text-slate-600">
                    <div className="flex items-center gap-3">
                      <Mail size={18} />
                      <span>{userData?.email ? userData?.email : "You@email.com"}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <UserRound size={18} />
                      <span>Active on Route Posts</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <MiniStatCard title="MY POSTS" value={postsLength ? postsLength : 0} />
                  <MiniStatCard title="SAVED POSTS" value="0" />
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}
