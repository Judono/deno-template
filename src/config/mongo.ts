import mongoose from "mongoose";
import { MONGO_CONFIG } from "./config.ts";
import RoleModel from "../models/role.model.ts";
import ListingFacilityModel from "../models/listing-facility.model.ts";

const roleSeeder = async () => {
  console.log("======= Seeding roles collection =======");
    if (await RoleModel.countDocuments() > 0) {
      console.log("Role data already seeded");
      return;
    }
    await RoleModel.insertMany([
      { name: "LANLORD" },
      { name: "TENANT" },
    ]).then(() => {
      console.log("Role data seeded");
    }).catch((err) => {
      console.error(err);
    });
}

const listingFacilitySeeder = async () => {
  console.log("======= Seeding listingFacilities collection =======");
    if (await ListingFacilityModel.countDocuments() > 0) {
      console.log("ListingFacility data already seeded");
      return;
    }
    await ListingFacilityModel.insertMany([
      { name: "Swimming Pool", icon: "pool", facilityType: "OUTDOOR" },
      { name: "Gym", icon: "gym", facilityType: "UTILITY" },
      { name: "Parking", icon: "parking", facilityType: "UTILITY" },
      { name: "Security", icon: "security", facilityType: "PRIMARY" },
      { name: "Elevator", icon: "elevator", facilityType: "PRIMARY" },
      { name: "Garden", icon: "garden", facilityType: "OUTDOOR" },
      { name: "Pet Friendly", icon: "pet", facilityType: "SECONDARY" },
      { name: "Furnished", icon: "furnished", facilityType: "SECONDARY" },
      { name: "Air Conditioning", icon: "ac", facilityType: "SECONDARY" },
      { name: "Heating", icon: "heating", facilityType: "SECONDARY" },
      { name: "Water Heater", icon: "waterheater", facilityType: "SECONDARY" },
      { name: "Balcony", icon: "balcony", facilityType: "SECONDARY" },
    ]).then(() => {
      console.log("ListingFacility data seeded");
    }).catch((err) => {
      console.error(err);
    });
}

const mongo = {
  dbName: MONGO_CONFIG.dbName,
  uri: MONGO_CONFIG.uri,
  connect: async () => {
    await mongoose.connect(mongo.uri, {
      dbName: mongo.dbName,
    }).then(() => {
      console.log("Connected to MongoDB");
    }).catch((err) => {
      console.error(err);
    });
  },
  seed: async () => {
    // Seed data
    console.log("======= Seeding the database =======");
    await roleSeeder();
    await listingFacilitySeeder();
    console.log("======= Seeding completed =======");
  }
} 

export default mongo;