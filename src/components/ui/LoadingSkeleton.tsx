import { cn } from '../../lib/utils'

interface LoadingSkeletonProps {
  className?: string
  rounded?: string
}

export function LoadingSkeleton({ className, rounded = 'rounded-xl' }: LoadingSkeletonProps) {
  return <div className={cn('skeleton', rounded, className)} />
}

export function MedicineCardSkeleton() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <LoadingSkeleton className="h-48 w-full" rounded="rounded-none" />
      <div className="p-4 space-y-3">
        <LoadingSkeleton className="h-5 w-3/4" />
        <LoadingSkeleton className="h-4 w-1/2" />
        <div className="flex gap-2">
          <LoadingSkeleton className="h-6 w-20" rounded="rounded-full" />
          <LoadingSkeleton className="h-6 w-16" rounded="rounded-full" />
        </div>
        <div className="flex justify-between items-center">
          <LoadingSkeleton className="h-6 w-24" />
          <LoadingSkeleton className="h-8 w-8" rounded="rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <LoadingSkeleton className="h-4 w-32" />
          <LoadingSkeleton className="h-8 w-24" />
          <LoadingSkeleton className="h-3 w-20" />
        </div>
        <LoadingSkeleton className="h-12 w-12" rounded="rounded-xl" />
      </div>
    </div>
  )
}

export function ChatItemSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3">
      <LoadingSkeleton className="h-11 w-11 shrink-0" rounded="rounded-full" />
      <div className="flex-1 space-y-2">
        <LoadingSkeleton className="h-4 w-32" />
        <LoadingSkeleton className="h-3 w-48" />
      </div>
    </div>
  )
}
