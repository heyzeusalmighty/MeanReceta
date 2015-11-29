/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var OldRecipes = require('./oldRecipes.model');

exports.register = function(socket) {
  OldRecipes.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  OldRecipes.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('oldRecipes:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('oldRecipes:remove', doc);
}