const models = require('../models');

const Pokemon = models.Pokemon;

const makerPage = (req, res) => {
  Pokemon.PokemonModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.render('app', { csrfToken: req.csrfToken(), Pokemons: docs });
  });
};

const makePokemon = (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const PokemonData = {
    nickname: req.body.nickname,
    dateCaught: req.body.dateCaught,
    shiny: req.body.shiny,
    combatPower: req.body.combatPower,
    height: req.body.height,
    weight: req.body.weight,
    gender: req.body.gender,
    quickA: req.body.quickA,
    chargedA: req.body.chargedA,
    iv: req.body.iv,
    owner: req.session.account._id,
  };

  const newPokemon = new Pokemon.PokemonModel(PokemonData);

  const PokemonPromise = newPokemon.save();

  PokemonPromise.then(() => res.json({ redirect: '/maker' }));

  PokemonPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Pokemon already exists.' });
    }

    return res.statuse(400).json({ error: 'An error occured' });
  });

  return PokemonPromise;
};


module.exports.makerPage = makerPage;
module.exports.make = makePokemon;
