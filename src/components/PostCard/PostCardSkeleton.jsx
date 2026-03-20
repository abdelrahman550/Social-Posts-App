import { Card, Skeleton } from "@heroui/react";
import React from "react";

export default function PostCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Card className="w-full space-y-5 p-4" radius="lg">
        <div className="flex w-full max-w-75 items-center gap-3">
          <div>
            <Skeleton className="flex h-12 w-12 rounded-full" />
          </div>
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
        <Skeleton className="rounded-lg">
          <div className="bg-secondary h-24 rounded-lg" />
        </Skeleton>
        <div className="space-y-3">
          
          <Skeleton className="w-4/5 rounded-lg items-center">
            <div className="bg-secondary-300 h-3 w-full rounded-lg" />
          </Skeleton>
          
        </div>
      </Card>
    </div>
  );
}
