'use client'
import { ProductCardProps } from '@/components/ProductCard'

interface Props {
  name: string
  category: string
  items: ProductCardProps[]
  setItems: React.Dispatch<React.SetStateAction<ProductCardProps[]>>
}

export const filterProducts = ({ name = '', category = '', items = [], setItems }: Props) => {
  // Define a filter function that checks both name and category if both are provided
  const filterFunction = (item: ProductCardProps) => {
    if (name && category) {
      return item.name.includes(name) && item.category === category
    } else if (name) {
      return item.name.includes(name)
    } else if (category) {
      return item.category === category
    }
    return true // If neither name nor category is provided, return true for all items
  }
  // Apply the filter function to the products array
  setItems(() => items.filter(filterFunction))
}
