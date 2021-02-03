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

class UsersRepository {
    constructor(filename) {
        if (!filename) {
            throw new Error('Creating a repository requires a filename')
        }
        this.filename = filename;
        try {
            fs.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }
    }
    async getAll() {
        return JSON.parse(await fs.promises.readFile(this.filename, {
            encoding: 'utf8'
        }));
    }
    async create(attrs) {
        attrs.id = this.randomID()
        const records = await this.getAll()
        records.push(attrs)

        await this.writeAll(records)
    }

    async writeAll(records) {
        await fs.promises.writeFile(
            this.filename, 
            JSON.stringify(records, null, 2)
        )
    }
    randomID() {
        return crypto.randomBytes(4).toString('hex')
    }

    async getOne(id) {
        const records = await this.getAll()
        return records.find(record => record.id === id)
    }

    async delete(id) {
        const records = await this.getAll()
        const filteredRecords = records.filter(record => record.id !== id)
        await this.writeAll(filteredRecords)
    }

    async update(id, attrs) {
        const records = await this.getAll()
        const record = records.find(record => record.id === id)

        if (!record) {
            throw new Error(`Record whit id ${id} not found!`)
        }
        //object.assign takes all attrs and copies 'em to record
        Object.assign(record, attrs)
        await this.writeAll(records)
    }

    async getOneBy(filters) {
        const records = await this.getAll()
        for(let record of records) {
            let found = true;

            for (let key in filters) {
                if (record[key] !== filters[key]) {
                    found = false
                }
            }
            if (found) {
                return record
            }
        }
    }
}
const test = async () => {
    const repo = new UsersRepository('users.json');

    const user = await repo.getOneBy({ 
        id: '13ed7f68' 
    })
    console.log(user)
}

test()