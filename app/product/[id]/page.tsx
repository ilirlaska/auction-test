'use client'
import { buyNow } from '@/actions/buyNow'
import { getItem } from '@/actions/getItem'
import { placeBid } from '@/actions/placeBid'
import { Button, Countdown, ImageCarousel, ProtectedRoute } from '@/components'
import { useServerAction } from '@/hooks'
import { BidType, ItemType } from '@/types'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const Product = () => {
  let { id } = useParams()
  id = id || ''
  const { data: session } = useSession() || {}
  const { user } = session || {}
  let item: ItemType = useServerAction(() => getItem(id), {})
  const [currentItem, setCurrentItem] = useState<ItemType>(item)
  const {
    images,
    name = '',
    price = 0,
    description,
    expiresAt,
    soldBy,
    soldTo,
    priceSteps,
    startingPrice,
    bids,
  } = currentItem
  const itsMyProduct = soldBy === user?.name
  const itsMyBid = bids?.[0]?.bidder === user?.name
  const itsSold = !soldTo
  const showActions = !itsMyProduct && itsSold

  const handlePlaceBid = async () => {
    const newBidPrice = parseInt(bids?.[0]?.bidPrice || startingPrice) + parseInt(priceSteps)
    const { success, updatedItem } =
      newBidPrice > parseInt(price)
        ? await buyNow({ id, username: user?.name, price: newBidPrice.toString() })
        : await placeBid({
            id,
            bid: {
              bidder: user?.name,
              bidPrice: newBidPrice.toString(),
            },
          })
    if (success) setCurrentItem(updatedItem)
  }

  const handleBuyNow = async () => {
    const { success, updatedItem }: { errors: any; success: boolean; updatedItem: ItemType } = await buyNow({
      id,
      username: user?.name,
      price,
    })
    if (success) setCurrentItem(updatedItem)
  }

  useEffect(() => {
    item && setCurrentItem(item)
  }, [item])

  return (
    <ProtectedRoute>
      <div className='w-full h-full flex gap-4 p-4 '>
        <div className='h-full rounded-md flex min-w-fit flex-col '>
          <div className='h-[600px] min-h-[600px] max-w-[800px] min-w-[800px] overflow-hidden'>
            {images && <ImageCarousel className='hover:scale-105' images={images} />}
          </div>
          <div className='p-4 text-title'>
            <div className='text-title w-full text-center capitalize'>{name}</div>
            <div className='flex gap-4 flex-col'>
              <div className='flex gap-5'>
                <div className='grow px-6 py-2 border rounded-2xl transition-colors focus:outline-none select-none bg-tertiary hover:bg-tertiary-tone-450 text-tertiary-contrast flex-center duration-500'>
                  {price}$
                </div>
                {itsSold && (
                  <div className='grow px-6 py-2 border rounded-2xl transition-colors focus:outline-none select-none bg-tertiary hover:bg-tertiary-tone-450 text-tertiary-contrast flex-center duration-500'>
                    <Countdown targetDate={expiresAt} />
                  </div>
                )}
              </div>
              {showActions && (
                <>
                  <Button onClick={handleBuyNow}>Buy Now</Button>
                  <Button disabled={itsMyBid} onClick={handlePlaceBid}>
                    Bid
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-col grow text-center'>
          <div className='text-title'>Item Description</div>
          {description}
        </div>
        <div className='flex flex-col min-w-[300px] gap-4 overflow-y-auto'>
          <div className='text-title text-center'>Sold To</div>
          <div className='flex justify-between'>
            <div className='w-full px-6 py-2 border rounded-2xl transition-colors focus:outline-none select-none bg-primary hover:bg-tertiary-tone-450 text-tertiary-contrast flex-center text-white'>
              {soldTo && `${soldTo?.username} - ${soldTo?.soldPrice} $`}
              {!soldTo && `Item Not Sold`}
            </div>
          </div>
          <div className='text-title text-center '>All Bids</div>
          {!bids?.length && (
            <div className='w-full px-6 py-2 border rounded-2xl transition-colors focus:outline-none select-none bg-tertiary hover:bg-tertiary-tone-450 text-tertiary-contrast flex-center'>
              No Bids Yet
            </div>
          )}
          {bids?.map(({ bidder, bidPrice }: BidType, index) => (
            <div key={index} className='flex justify-between'>
              <div className='w-full px-6 py-2 border rounded-2xl transition-colors focus:outline-none select-none bg-tertiary hover:bg-tertiary-tone-450 text-tertiary-contrast flex-center'>
                {bidder} - {bidPrice}$
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Product
