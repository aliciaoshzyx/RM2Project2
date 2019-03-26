const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let PokemonModel = {};

const convertId = mongoose.Types.ObjectId;

const PokemonSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },

  dateCaught: {
    type: Date,
    required: true,
  },

  shiny: {
    type: String,
    required: true,
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

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

PokemonSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
});

PokemonSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return PokemonModel.find(search)
  .select('nickname dateCaught shiny combatPower height weight gender quickA chargedA iv')
  .exec(callback);
};

PokemonModel = mongoose.model('Pokemon', PokemonSchema);

module.exports.PokemonModel = PokemonModel;
module.exports.PokemonSchema = PokemonSchema;
