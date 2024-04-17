import { UserType } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const UserSchema = new Schema<UserType>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
})

const User: Model<UserType> = models?.User || model<UserType>('User', UserSchema)

export default User
