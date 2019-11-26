const path = require('path');

module.exports = {
    index: function(req, res){
        res.sendFile(path.join(__dirname, '../views/index.html'));
    },
    chat: function(req, res){
        res.sendFile(path.join(__dirname, '../views/chat.html'));
    }
};