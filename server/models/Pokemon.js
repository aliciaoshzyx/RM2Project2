const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let PokemonModel = {};

const convertId = mongoose.Types.ObjectId;

const PokemonSchema = new mongoose.Schema({
  pname: {
    type: String,
    required: true,
  },

  dateCaught: {
    type: Date,
    required: true,
  },

  shiny: {
    type: String,
    required: false,
  },

  combatPower: {
    type: Number,
    required: true,
    min: 10,
  },

  height: {
    type: Number,
    required: true,
    min: 0,
  },

  weight: {
    type: Number,
    required: true,
    min: 1,
  },

  gender: {
    type: String,
    required: true,
  },

  quickA: {
    type: String,
    required: true,
  },

  chargedA: {
    type: String,
    required: true,
  },

  iv: {
    type: String,
    required: true,
  },

  number: {
    type: Number,
    required: true,
  },

  picture: {
    type: String,
    required: false,
  },

  type1: {
    type: String,
    required: true,
  },

  type2: {
    type: String,
    required: false,
    default: ' ',
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },

  user: {
    type:String,
    required: true,
  }
});

PokemonSchema.statics.toAPI = (doc) => ({
  pname: doc.pname,
  dateCaught: doc.dateCaught,
  shiny: doc.shiny,
  combatPower: doc.combatPower,
  height: doc.height,
  weight: doc.weight,
  gender: doc.gender,
  quickA: doc.quickA,
  chargedA: doc.chargedA,
  iv: doc.iv,
  picture: doc.picture,
  number: doc.number,
  type1: doc.type1,
  type2: doc.type2,
  owner: doc.owner,
  user: doc.user,
});

PokemonSchema.statics.findAll = (callback) => PokemonModel.find().exec(callback);

PokemonSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return PokemonModel.find(search)
  .select(`pname dateCaught shiny combatPower height weight 
  gender quickA chargedA iv number picture type1 type2 owner user`)
  .exec(callback);
};


PokemonModel = mongoose.model('Pokemon', PokemonSchema);

module.exports.PokemonModel = PokemonModel;
module.exports.PokemonSchema = PokemonSchema;
