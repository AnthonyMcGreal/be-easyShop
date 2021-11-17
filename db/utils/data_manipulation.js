const db = require('../connection.js');

exports.formatUsersData = (userData) => {
  const formattedData = userData.map((userObject) => {
    return [userObject.name, userObject.username, userObject.avatar_url];
  });
  return formattedData;
};

exports.formatMiscItemsData = (miscItemsData) => {
  const formattedData = miscItemsData.map((itemData) => {
    return [itemData.name, itemData.user, itemData.category];
  });
  return formattedData;
};
