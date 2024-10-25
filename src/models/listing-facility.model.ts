import {Schema, model, InferSchemaType} from 'mongoose';

enum facilityType {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  OUTDOOR = "OUTDOOR",
  UTILITY = "UTILITY",
}

const listingFacilitySchema = new Schema(
  {
    name: { type: String, required: true },
    icon: { type: String },
    facilityType: { type: String, enum: Object.values(facilityType), required: true },
  },
  { timestamps: true }
);

export type ListingFacility = InferSchemaType<typeof listingFacilitySchema>;

const ListingFacilityModel = model<ListingFacility>('listingFacilities', listingFacilitySchema);

export default ListingFacilityModel;