import {Schema, model, InferSchemaType, Types} from 'mongoose';

enum PropertyType {
  HOUSE = "HOUSE",
  APARTMENT = "APARTMENT",
  BOARDING_HOUSE = "BOARDING_HOUSE",
}

enum PropertyStatus {
  PENDING= "PENDING",
  AVAILABLE= "AVAILABLE",
  FULL= "FULL",
  BLACKLISTED= "BLACKLISTED",
}

const listingSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    rentPrice: { type: Number, required: true },
    location: {
      address: { type: String },
      city: { type: String },
      province: { type: String },
      geo: {
        type: { type: String, default: "Point" },
        coordinates: { type: [Number], default: [0, 0] }
      }
    },
    type: { type: String, enum: Object.values(PropertyType), required: true },
    status: { type: String, enum: Object.values(PropertyStatus), default: PropertyStatus.PENDING },
    genderTarget: { type: String, enum: ["MALE", "FEMALE", "MIXED"]},
    owner: { type: Types.ObjectId, ref: 'users', required: true },
    internetIcluded: { type: Boolean, default: false },
    electricityIncluded: { type: Boolean, default: false },
    waterIncluded: { type: Boolean, default: false },
    facilities: [{ type: Types.ObjectId, ref: 'listingFacilities' }],
  },
  { timestamps: true }
);

export type Listing = InferSchemaType<typeof listingSchema>;

const ListingModel = model<Listing>('listings', listingSchema);

export default ListingModel;