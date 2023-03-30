const User = require("./User");
const Listing = require("./Listing");
const Comment = require("./Comment");

User.hasMany(Listing, {
  foreignKey: "user_id",
});

Listing.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Listing.hasMany(Comment, {
  foreignKey: 'listing_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULLL'
});

Comment.belongsTo(Listing, {
  foreignKey: 'listing_id'
});


module.exports = { User, Listing, Comment };
