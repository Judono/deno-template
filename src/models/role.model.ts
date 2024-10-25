import {Schema, model, InferSchemaType} from 'mongoose';


const roleSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export type RoleType = InferSchemaType<typeof roleSchema>;

const RoleModel = model<RoleType>('roles', roleSchema);

export default RoleModel;