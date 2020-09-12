


exports.checkRolesExist = (req,res,next)=>{
	const ROLES= ["admin",'user','moderator'];

	if(req.body.roles){

		let  array= req.body.roles;
		array.forEach( function(rol) {
			if(!ROLES.includes(rol)){
               return res.json({'rol '})
			}
		});
		next();

	}
}