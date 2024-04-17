'use client'
import { saveItem } from '@/actions/saveItem'
import { Button, Input, Modal, SelectDropdown, TextArea, Form, Error } from '@/components'
import { productCategories } from '@/lib/settings'
import { ItemType, ItemZodSchema } from '@/types'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

interface Props {
  setItems: (items: ItemType[]) => void
  setAllProducts: (items: ItemType[]) => void
  items: ItemType[]
}

const AddItem = ({ setItems, items, setAllProducts }: Props) => {
  const [modal, setModal] = useState(false)
  const [error, setError] = useState()
  const { data: session } = useSession() || {}
  const { user } = session || {}

  const onSubmit = async (data: ItemType) => {
    const { errors, success, savedItem } = (await saveItem({ ...data, soldBy: user?.name || '' })) || {}
    if (errors) return setError(errors)
    if (success) {
      setModal(false)
      setItems([...items, savedItem])
      setAllProducts(prev => [...prev, savedItem])
    }
  }

  return (
    <div>
      <Button onClick={() => setModal(true)}>Add Item</Button>
      {modal && (
        <Modal isOpen={modal} title='Add Item' hideFooter onClose={() => setModal(false)}>
          <Form className='flex flex-col gap-3' schema={ItemZodSchema} onSubmit={onSubmit}>
            <Input type='text' placeholder='Name' label='Product Name' name='name' />
            <SelectDropdown label='Product Category' options={productCategories} name='category' />
            <Input type='number' placeholder='Price' label='Buy Now Price' name='price' />
            <Input type='number' placeholder='Starting Price' label='Starting Price' name='startingPrice' />
            <Input type='number' placeholder='Price Steps' label='Price Steps' name='priceSteps' />
            <Input type='date' placeholder='Start Date' label='start Date' name='createdAt' />
            <Input type='date' placeholder='End Date' label='End Date' name='expiresAt' />
            <Input
              type='text'
              placeholder='Images'
              label='Product Images (separate image links with commas) '
              name='images'
            />
            <TextArea placeholder='Description' label='Product Description' name='description' />
            <Button type='submit'>Submit</Button>
            {error && <Error>{error}</Error>}
          </Form>
        </Modal>
      )}
    </div>
  )
}

export default AddItem
