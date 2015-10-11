'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TagSchema = new Schema({
  tagName: String,
  active: Boolean
});

module.exports = mongoose.model('Tag', TagSchema);