'use client'
import { getItems } from '@/actions/getItems'
import { Button, Grid, Input, ProductCard, Form, SelectDropdown, ProtectedRoute } from '@/components'
import { useServerAction } from '@/hooks'
import { productCategories } from '@/lib/settings'
import { ItemType, SearchType, SearchZodSchema } from '@/types'
import { filterProducts } from '@/utils/filterProducts'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const MyCart = () => {
  const { data: session } = useSession() || {}
  const { user } = session || {}
  const filter = { filter: { 'soldTo.username': user?.name } }
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
    <ProtectedRoute>
      <main className='flex min-h-screen flex-col items-center h-[2000px]'>
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
        {searchedProducts?.length == 0 && <div>You have no items in you cart, buy some</div>}
        {searchedProducts?.length > 0 && (
          <Grid>
            {searchedProducts?.map((product: any, index: number) => (
              <ProductCard
                key={product._id}
                {...{ ...product, delay: index * 1000, buttonLabel: 'See Details' }}
              />
            ))}
          </Grid>
        )}
      </main>
    </ProtectedRoute>
  )
}

export default MyCart
