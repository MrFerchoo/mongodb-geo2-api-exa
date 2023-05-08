const mongoose = require("mongoose");
const User = require("../models/user");

const findAllUsers = (req, res) => {
  User.find().then(
    (users) => {
      console.log("Users FindAll Succes");
      res.status(200).json(users);
    },
    (err) => {
      console.log("Users FindAll Error");
      err && res.status(500).send(err.message);
    }
  );
};

const findAllGeoUser = (req, res) =>{
  User.find().then((users) => {
    console.log('User FindAll GeoUsers Succes');
    var geousers = {type: "FeatureCollection", "features":[]};
    users.map(item=>{
      geousers.features.push(
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [item.Longitude, item.Latitude]
          },
          properties: {
            name: item.name,
            manager_name: item.manager_name
          },
          id: item._id
        }
      );
    });
    res.status(200).json(geousers);
  },
  (err) => {
    console.log("Find GeoUsers Error");
    err && res.status(500).send(err.message);
  }
  );
};

const updateUserLocation = (req, res) => {
  console.log(req.body);
  const key = Object.keys(req.body)[0];
  // console.log(key);
  const parsedKey = JSON.parse(key);
  // console.log(parsedKey);
  User.updateOne({_id:parsedKey.id}, 
      {Latitude:parsedKey.Latitude, 
          Longitude: parsedKey.Longitude}).then((usr) =>{
          res.status(200).json(usr);
      },
      err => {
          err && res.status(500).send(err.message);
  });
}

const findById = (req, res) => {
  console.log(req.params);
  User.findById(req.params.id).then(
    (user) => {
      res.status(200).json(user);
    },
    (err) => {
      err && res.status(500).send(err.message);
    }
  );
};

const addUser = (req, res) => {
  let user = new User({
    name: req.body.name,
    manager_name: req.body.manager_name,
    Latitude: req.body.Latitude,
    Longitude: req.body.Longitude,
  });
  user.save().then(
    (usr) => {
      res.status(200).json(usr);
    },
    (err) => {
      err && res.status(500).send(err.message);
    }
  );
};

/*const updateUserLocation = (req, res) => {
  console.log(req.body);
  User.updateOne(
    { _id: req.body.id },
    {
      latestLaltitude: req.body.latestLaltitude,
      latestLongitude: req.body.latestLongitude,
    }
  ).then(
    (usr) => {
      res.status(200).json(usr);
    },
    (err) => {
      err && res.status(500).send(err.message);
    }
  );
};*/

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Verificar si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Borrar el usuario
    await user.remove();

    return res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error de servidor' });
  }
};

const findBymanagerName = (req, res) => {
  console.log(req.params.manager_name);
  User.find({manager_name:req.params.manager_name}).then((user) => {
      res.status(200).json(user);
  },
  err => {
      err && res.status(500).send(err.message);
  });
};

module.exports = { findAllUsers, findById, addUser, updateUserLocation, findBymanagerName, findAllGeoUser, deleteUser,};
