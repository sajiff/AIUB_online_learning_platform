var db = require('./db');

module.exports ={

	get: function(id, callback){
		var sql = "select * from admin where name=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},

	getAll: function(callback){
		var sql = "select * from admin";
		db.getResults(sql, null,  function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},


	insert: function(user, callback){
		var sql = "insert into admin values(?, ?, ?, ?, ?)";
		db.execute(sql, [user.ID, user.name, user.email, user.address, user.phone_number], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	update: function(user, callback){
		var sql = "update admin set ID=?, name=?, email=?, address=?, phone_number=? where ID=?";
		db.execute(sql, [user.ID, user.name, user.email, user.address, user.phone_number, user.ID], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	delete: function(id, callback){
		var sql = "delete from admin where ID=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}
