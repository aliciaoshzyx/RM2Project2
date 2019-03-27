const models = require('../models');

const Pokemon = models.Pokemon;

const makerPage = (req, res) => {
  Pokemon.PokemonModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    return res.render('app', { csrfToken: req.csrfToken(), pokemons: docs });
  });
};

const makePokemon = (req, res) => {
  console.log(req.body);
  if (!req.body.pname || !req.body.gender) {
    return res.status(400).json({ error: 'All fields are required - in make' });
  }

  const pokemonData = {
    pname: req.body.pname,
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

  const newPokemon = new Pokemon.PokemonModel(pokemonData);

  const pokemonPromise = newPokemon.save();

  pokemonPromise.then(() => res.json({ redirect: '/maker' }));

  pokemonPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Pokemon already exists.' });
    }

    return res.statuse(400).json({ error: 'An error occured' });
  });

  return pokemonPromise;
};


module.exports.makerPage = makerPage;
module.exports.make = makePokemon;
