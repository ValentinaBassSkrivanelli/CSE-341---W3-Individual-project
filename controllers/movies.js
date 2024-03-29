const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('movies').find();
  result.toArray().then((lists, err) => {
      if (err) {
        res.status(400).json({ message: err });
      }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
   if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('movies').find({ _id: userId });
  result.toArray().then((lists, err) => {
      if (err) {
        res.status(400).json({ message: err });
      }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) => {
  const movies = {
    nombre: req.body.nombre,
    director: req.body.director,
    clasificacion: req.body.clasificacion
  };
  const response = await mongodb.getDb().db().collection('movies').insertOne(movies);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the movie.');
  }
};

const updateContact = async (req, res) => {
   if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a movie.');
  }
 
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const movies = {
    nombre: req.body.nombre,
    director: req.body.director,
    clasificacion: req.body.clasificacion
  
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('movies')
    .replaceOne({ _id: userId }, movies);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the movie.');
  }
};

const deleteContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a movie.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('movies').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};
module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
