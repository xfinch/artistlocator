const express = require('express');
const router = express.Router();
const Artist = require('../models/artists.js')

//get list of artists from database
router.get('/artists',function(req, res, next){
  /*Artist.find({}).then(function(artist){
    res.send(artist);
  });*/
  Artist.geoNear(
  {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        {maxDistance: 100000, spherical: true}
    ).then(function(artists){
        res.send(artists);
    })/*.catch(next)*/;
});

//add a new artist to db
router.post('/artists',function(req, res, next){
  Artist.create(req.body).then(function(artist){
    res.send(artist);
  }).catch(next);
});

//updete current listed artists
router.put('/artists/:id',function(req, res, next){
  Artist.findByIdAndUpdate({_id:req.params.id}, req.body).then(function(){
    Artist.findOne({_id:req.params.id}).then(function(artist){
      res.send(artist);
    });
  });
});
//delete an artist from the list
router.delete('/artists/:id',function(req, res, next){
  Artist.findByIdAndRemove({_id:req.params.id}).then(function(artist){
    res.send(artist);
  });
});

module.exports = router;
