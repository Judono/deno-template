import {Schema, model, InferSchemaType, Types} from 'mongoose';

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    birthDate: { type: Date },
    gender: { type: String, enum: ["MALE", "FEMALE"]},
    domicile: {
      address: { type: String },
      city: { type: String },
      province: { type: String },
    },
    maritalStatus: { type: String, enum: ["SINGLE", "MARRIED", "DIVORCED"]},
    document: {
      idCard: {
        idNumber: { type: String },
        photo: { type: String },
        verified: { type: Boolean, default: false },
      },
      familyCertPhoto: { type: String },
      marriageCertPhoto: { type: String }
    },
    roleRef: { type: Types.ObjectId, ref: 'roles', required: true },
  },
  { timestamps: true }
);

export type User = InferSchemaType<typeof userSchema>;

const UserModel = model<User>('users', userSchema);

export default UserModel;