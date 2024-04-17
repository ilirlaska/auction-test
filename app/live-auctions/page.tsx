'use client'
import { getItems } from '@/actions/getItems'
import { Button, Grid, Input, Modal, ProductCard, Form, SelectDropdown } from '@/components'
import { useServerAction } from '@/hooks'
import { productCategories } from '@/lib/settings'
import { ItemType, SearchType, SearchZodSchema } from '@/types'
import { filterProducts } from '@/utils/filterProducts'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const LiveAuction = () => {
  const { data: session } = useSession() || {}
  const { user } = session || {}
  const filter = { filter: user?.name ? { soldBy: { $ne: user?.name }, soldTo: null } : { soldTo: null } }
  const { items }: { items: Array<ItemType> } = useServerAction(() => getItems(filter))
  const [searchedProducts, setSearchedProducts]: any = useState(items)

  const onSubmit = ({ name = '', category = '' }: SearchType) =>
    filterProducts({
      name,
      category,
      items,
      setItems: setSearchedProducts,
    })

  useEffect(() => {
    setSearchedProducts(items)
  }, [items])

  return (
    <main className='flex min-h-screen flex-col items-center min-w-full'>
      <div className='flex-row flex mb-4 justify-around w-full'>
        <div className='flex gap-2'>
          <Form<SearchType> className='flex-center gap-2' schema={SearchZodSchema} onSubmit={onSubmit}>
            <Input type='text' placeholder='Search' className='min-w-[200px] max-w-[200px]' name='name' />
            <SelectDropdown
              name='category'
              className='min-w-[200px] max-w-[200px]'
              options={productCategories}
            />
            <Button type='submit'>Search</Button>
          </Form>
          <Button theme='tertiary' onClick={() => setSearchedProducts(items)}>
            Clear
          </Button>
        </div>
      </div>
      {searchedProducts?.length == 0 && (
        <div className='justify-self-center'>No items for sale, Come back later...</div>
      )}
      {searchedProducts?.length > 0 && (
        <Grid>
          {searchedProducts?.map((product: any, index: number) => (
            <ProductCard
              key={product._id}
              {...{ ...product, delay: index * 1000, buttonLabel: 'Place a bid' }}
            />
          ))}
        </Grid>
      )}
    </main>
  )
}

export default LiveAuction
