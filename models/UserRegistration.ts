import { UserRegisterType } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const UserRegistrationSchema = new Schema<UserRegisterType>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
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

const UserRegister: Model<UserRegisterType> =
  models?.User || model<UserRegisterType>('User', UserRegistrationSchema)

export default UserRegister
