import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
export const Persons = new Mongo.Collection("persons");

Persons.schema = new SimpleSchema({
  firstname: {
    type: String,
    optional: false
  },
  lastname: {
    type: String,
    optional: false
  },
  dob: {
    // type: Date,
    optional: true
  },
  bio: {
    type: String,
    optional: false
  }
});

Persons.attachSchema(Persons.schema);
