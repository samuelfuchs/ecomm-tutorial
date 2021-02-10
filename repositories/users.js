// const fs = require('fs')

// class UsersRepository {
//     constructor(filename) { //constructors in JS are not allowed to make asynchronous calls
//         if (!filename) {
//             throw new Error('Creating a repository requires a filename')
//         }

//         this.filename = filename;
//         // check to see if a file exists
//         //accessSync is not so good to use for a bigger project
//         try {
//             fs.accessSync(this.filename);
//         } catch (err) {
//             fs.writeFileSync(this.filename, '[]');
//         }
//     }
//     async checkForFile() {}
// }

// new UsersRepository()

// const repo = new UsersRepository('users.json');

const fs = require('fs')
const crypto = require('crypto')
const util = require('util')
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
    async comparePasswords(saved, supplied) {
        //saved>pwd saved in database 'hashed.salt'
        //supplied>pwd diven to us by user trying sign in
        const [hashed, salt] = saved.split('.');

        const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

        return hashed === hashedSuppliedBuf.toString('hex');
    }
    async create(attrs) {
        //attrs === {email: '', password: ''}
        attrs.id = this.randomID();

        const salt = crypto.randomBytes(8).toString('hex');
        const buf = await scrypt(attrs.password, salt, 64);

        const records = await this.getAll();
        const record = {
            ...attrs,
            password: `${buf.toString('hex')}.${salt}`
        }
        records.push(record);

        await this.writeAll(records);

        return record;
    }
}

module.exports = new UsersRepository('users.json');