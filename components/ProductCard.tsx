'use client'

import Link from 'next/link'
import { Button, Countdown, ImageCarousel } from '.'
import { BidType, SoldType } from '@/types'

export interface ProductCardProps {
  _id: string
  price: number
  name: string
  buttonLabel: string
  bids?: BidType[]
  category?: string
  description: string
  expiresAt: string
  images?: string
  soldBy?: string
  soldTo?: SoldType
  delay?: number
}

const ProductCard = ({
  name,
  price,
  bids,
  images,
  delay = 0,
  _id,
  expiresAt,
  buttonLabel,
  soldTo,
}: ProductCardProps) => {
  return (
    <div className='flex flex-col gap-2 align-center max-w-[300px] min-w-[300px] bg-white min-h-[400px] max-h-[400px] border border-solid overflow-hidden	rounded-md group shadow-lg hover:shadow-2xl transition-all duration-500 p-2'>
      <div className='overflow-hidden w-full h-[200px] min-h-[200px] rounded-md bg-primary'>
        <ImageCarousel className='group-hover:scale-105' images={images} delay={delay} />
      </div>
      <div className='text-name text-center'>{name}</div>
      <div className='grow w-full text-ellipsis text-center overflow-hidden'>
        {bids?.at(-1)?.bidPrice || price}$
      </div>
      {!soldTo && <Countdown targetDate={expiresAt} />}
      {soldTo && <div className='w-full text-center text-bold'>Sold</div>}
      <Link href={`/product/${_id}`}>
        <Button className='w-full'>{buttonLabel}</Button>
      </Link>
    </div>
  )
}

export default ProductCard
