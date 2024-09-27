import type { HTMLAttributes } from 'react'
import { cn } from '../utils/cn'

export type FullScreenSpinnerProps = HTMLAttributes<HTMLDivElement> & {
  className?: string
}

const FullScreenSpinner = ({
  className,
  ...props
}: FullScreenSpinnerProps) => {
  return (
    <div className='w-full h-full fixed top-0 left-0 bg-white'>
      <div className='flex justify-center items-center mt-[50vh]'>
        <div className={cn("w-12 h-12 rounded-full animate-spin border-y-4 border-solid border-purple-500 border-t-transparent", className)} {...props} />
      </div>
    </div>
  )
}

export default FullScreenSpinner