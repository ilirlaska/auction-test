'use client'
import { Button, Grid, Input, ProductCard, Form, SelectDropdown, ProtectedRoute, Title } from '@/components'
import { productCategories } from '@/lib/settings'
import { ItemType, SearchType, SearchZodSchema } from '@/types'
import { filterProducts } from '@/utils/filterProducts'
import { useEffect, useState } from 'react'
import AddItem from './AddItem'
import { useServerAction } from '@/hooks'
import { getItems } from '@/actions/getItems'
import { useSession } from 'next-auth/react'

const MyItems = () => {
  const { data: session } = useSession() || {}
  const { user } = session || {}

  const filter = { filter: { soldBy: user?.name, 'soldTo.username': { $ne: user?.name } } }
  const { items }: { items: Array<ItemType> } = useServerAction(() => getItems(filter))
  const [searchedProducts, setSearchedProducts]: any = useState(items)
  const [allProducts, setAllProducts]: any = useState(items)

  const onSubmit = ({ name = '', category = '' }: SearchType) =>
    filterProducts({
      name,
      category,
      items: allProducts,
      setItems: setSearchedProducts,
    })

  useEffect(() => {
    setSearchedProducts(items)
    setAllProducts(items)
  }, [items])

  return (
    <ProtectedRoute>
      <main className='flex min-h-screen flex-col items-center'>
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
            <AddItem setItems={setSearchedProducts} items={allProducts} setAllProducts={setAllProducts} />
          </div>
        </div>
        {searchedProducts?.length == 0 && (
          <div className='w-full min-h-full flex-center'>You have no items for sale, add some</div>
        )}
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

export default MyItems
