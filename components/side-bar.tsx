import UserAvatar from './user-avatar'
import ButtonNav from "./button-nav";
import { cn } from '@/lib/utils'

export default function SideBar({ className, onButtonNavClick }: { className?: string, onButtonNavClick?: () => void }) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className='p-4'>
        <UserAvatar 
          image="https://robohash.org/hicveldicta.png?size=50x50&set=set1"
          fullName="Terry Medhurst"
          email="atuny0@sohu.com"
        />
      </div>

      <div className="px-4 pt-4">
        <h2 className="mb-4 px-4 text-lg font-semibold tracking-tight">
          Page
        </h2>
        
        <div className="space-y-1">
          <ButtonNav href="/" className="w-full justify-start" onClick={onButtonNavClick}>
            Product
          </ButtonNav>

          <ButtonNav href="/cart" className="w-full justify-start mt-2" onClick={onButtonNavClick}>
            Cart
          </ButtonNav>
        </div>
      </div>
    </div>
  )
}
