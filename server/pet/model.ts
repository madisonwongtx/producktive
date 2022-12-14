import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

export type Pet = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  petName: string;
  lastFed: Date;
  health: number;
  itemsOn: Record<"duck" | "beak" | "hat", string>;
};

const PetSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  petName: {
    type: String,
    required: true,
  },
  lastFed: {
    type: Date,
    required: true,
  },
  health: {
    type: Number,
    required: true,
  },
  itemsOn: {
    type: Object,
    required: true,
  },
});

const PetModel = model<Pet>("Pet", PetSchema);
export default PetModel;
