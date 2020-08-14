var db = require('./db');

module.exports ={

	get: function(id, callback){
		var sql = "select * from student where ID=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	getAll: function(callback){
		var sql = "select * from student";
		db.getResults(sql, null,  function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},


	insert: function(user, callback){
		var sql = "insert into student values(?, ?, ?, ?, ?, ?, ?)";

		db.execute(sql, [user.ID, user.name, user.email, user.phone_number, user.program, user.courses, user.CGPA], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	update: function(user, callback){
		var sql = "update student set ID=?, name=?, email=?, phone_number=?, program=?, courses=?, CGPA=? where ID=?";
		db.execute(sql, [user.ID, user.name, user.email, user.phone_number, user.program, user.courses, user.CGPA, user.ID], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	delete: function(id, callback){
		var sql = "delete from student where ID=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}
