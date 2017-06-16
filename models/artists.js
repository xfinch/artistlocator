const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  //create Geo-location Schema
const GeoSchema = new Schema({
      type: {
          type: String,
          default: "Point"
      },
      coordinates: {
          type: [Number],
          index: "2dsphere"
      }
  });
//create artists Schema and Model
const ArtistSchema = new Schema({
  fname: {
    type: String,
    required: [true, 'First Name field is required']
  },
  lname: {
    type: String,
    required: [true, 'Last Name field is required']
  },
  artform: {
    type: String,
    required: [true, 'Artform field is required']
  },
  //add in Geo location of the artists
  geometry: GeoSchema
});
const Artist = mongoose.model('artist', ArtistSchema);

module.exports = Artist;
