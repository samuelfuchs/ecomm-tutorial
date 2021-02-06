const layout = require('../layout');

//helper funtion
const getError = (errors, prop) => {
 //prop= 'email' , 'pwd', ...
 //mapped gives us the object
 // [] look into the object
 //msg gives us the msg object
 //try catch is a cheat
 //correct way would be to create if statements for every event
 try {
     return errors.mapped()[prop].msg
 } catch (err) {
     return '';
 }
};

module.exports = ({ req, errors }) => {
    return layout({ 
        content:`
    <div>
        Your id is: ${req.session.userId}
        <form method="POST">
            <input name="email" placeholder="email" />
            ${getError(errors, 'email')}
            <input name="password" placeholder="password" />
            ${getError(errors, 'password')}
            <input name="passwordConfirmation" placeholder="password confirmation" />
            ${getError(errors, 'passwordConfirmation')}
            <button>Submit</button>
        </form>
    </div>
    `
    });
};