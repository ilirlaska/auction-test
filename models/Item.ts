import { ItemType, SoldType } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const ItemSchema = new Schema<ItemType>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    immutable: true,
  },
  expiresAt: {
    type: String,
    immutable: true,
  },
  bids: {
    type: [],
    default: [],
  },
  soldBy: {
    type: String,
    required: true,
  },
  priceSteps: {
    type: String,
    required: true,
  },
  startingPrice: {
    type: String,
    required: true,
  },
  soldTo: {
    type: {},
    default: null,
  },
})

const Item: Model<ItemType> = models?.Item || model<ItemType>('Item', ItemSchema)

export default Item
