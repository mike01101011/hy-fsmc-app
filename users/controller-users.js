// model > controller > app
const User = require('./model-user.js');
const users = {};

users.getUsers = ( req, res ) => { // console.log('controller-users.js-----------users.GETUsers'); // http://localhost:8080/api/users
    User.find( function( err, docs ) {
        if( err ) { res.status( 400 ).send( err ); }
        else { res.status( 200 ).send( docs ); }
    } );
};

users.postUser = ( req, res ) => { // console.log('controller-user-users.js-----------users.POSTUser');
    const userModel = new User();
    const user = Object.assign( userModel, req.body );
    user.save( ( err, doc ) => {
        if ( err ) { res.status( 500 ).send( err ); }
        res.status( 200 ).send( doc );
    });
}

users.deleteUser = ( req, res ) => { // console.log('controller-users.js-----------users.DELETEUser');
    const userId = req.params.id;
    User.remove( { _id: userId }, ( err, doc ) => {
        if ( err ) { res.status( 500 ).send( err ); }
        else { res.status( 200 ).json( { message: 'Successfully Deleted!'} ); }
    });
}

users.updateUser = ( req, res ) => { // console.log('controller-users.js-----------users.UPDATEUser');
    const model = req.body;
    const user = User.findById( req.params.id, ( err, doc ) => {
        if ( err ) { res.status( 500 ).send( err ); }
        else {
            delete req.body._id;
            const updatedUser = Object.assign(doc, model);
            updatedUser.save(( err, doc ) => {
                if (err) { res.status( 500 ).send( err ); }
                else { res.status( 200 ).send( doc ); }
            } );
        }
    } );
}

module.exports = users;