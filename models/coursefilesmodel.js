var db = require('./db');

module.exports ={

	get: function(id, callback){
		var sql = "select * from course_files where course_ID=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	getAll: function(callback){
		var sql = "select * from course_files";
		db.getResults(sql, null,  function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},


	insert: function(user, callback){
		var sql = "insert into course_files values(?, ?, ?)";

		db.execute(sql, [user.course_ID, user.file_link, user.title], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	update: function(user, callback){
		var sql = "update course_files set course_ID=?, file_link=?, title=? where course_ID=?";
		db.execute(sql, [user.course_ID, user.file_link, user.title, user.course_ID], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	delete: function(id, callback){
		var sql = "delete from course_files where course_ID=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}
