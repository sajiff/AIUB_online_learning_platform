var db = require('./db');

module.exports ={

	get: function(id, callback){
		var sql = "select * from courses where course_ID=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	getAll: function(callback){
		var sql = "select * from courses";
		db.getResults(sql, null,  function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},


	insert: function(user, callback){
		var sql = "insert into courses values(?, ?, ?, ?)";

		db.execute(sql, [user.course_ID, user.course_name, user.section, user.instructor], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	update: function(user, callback){
		var sql = "update courses set course_ID=?, course_name=?, section=?, instructor=? where course_ID=?";
		db.execute(sql, [user.course_ID, user.course_name, user.section, user.instructor, user.course_ID], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	delete: function(id, callback){
		var sql = "delete from courses where course_ID=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}
