const FileSync = require('lowdb/adapters/FileSync');
const low = require('lowdb');
//
const adapter = new FileSync('db.json');
const db = low(adapter);
//
// // Set some defaults (required if your JSON file is empty)
db.defaults({ tasks: [], user: {}, count: 0 })
   .write()

const generateId = () => {
   let id = '';
   let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   for( var i=0; i < 5; i++ ) {
       id += possible.charAt(Math.floor(Math.random() * possible.length));
   }
   return id;
}

module.exports = {
  getAll(){
    console.log('function get All ');
    const size = db.get('tasks').size().value();
    const tasks = [];
    for (let i = 0; i < size; i++) {
      let index = `tasks[${i}]`;
      let task = db.get(index)
      .value();
      tasks.push(task);
    }
    return tasks;
  },
  getData(postID) {
    const data = db.get('tasks')
      .find({id: postID})
      .value();
    return data;
  },
  saveData(value) {
    console.log('value : ', value);
    const id = generateId();
    db.get('tasks')
      .push({id, title: value, done: false})
      .write();
    return id;
  },
  deleteData(value) {
    db.get('tasks')
      .remove({id: value})
      .write();
  },
  updateData(done, title, id) {
    console.log(title);
    db.get('tasks')
      .find({id})
      .assign({done , title})
      .write();
  },

};
