require('dotenv/config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./models/user.model')(sequelize, Sequelize);
db.alternative = require('./models/alternative.model')(sequelize, Sequelize);
db.answer = require('./models/answer.mode')(sequelize, Sequelize);
db.class = require('./models/class.model')(sequelize, Sequelize);
db.pdf = require('./models/pdf.model')(sequelize, Sequelize);
db.question = require('./models/question.model')(sequelize, Sequelize);
db.test = require('./models/test.model')(sequelize, Sequelize);
db.user_class = require('./models/user_class.model')(sequelize, Sequelize);

db.question.hasMany(db.alternative, { as: 'alternativas' });
db.alternative.belongsTo(db.question, { foreignKey: 'questoId', as: 'questoes' });

db.test.hasMany(db.question, { as: 'questoes' });
db.question.belongsTo(db.test, { foreignKey: 'provaId', as: 'provas' });

db.class.hasMany(db.test, { as: 'provas' });
db.test.belongsTo(db.class, { foreignKey: 'turmaId', as: 'turmas' });

db.users.hasMany(db.user_class, { as: 'usuarios_turmas' });
db.user_class.belongsTo(db.users, { foreignKey: 'usuarioId', as: 'usuarios' });

db.class.hasMany(db.user_class, { as: 'usuarios_turmas' });
db.user_class.belongsTo(db.class, { foreignKey: 'turmaId', as: 'turmas' });

db.test.hasMany(db.pdf, { as: 'pdfs' });
db.pdf.belongsTo(db.test, { foreignKey: 'provaId', as: 'provas' });

db.question.hasMany(db.answer, { as: 'respostas' });
db.answer.belongsTo(db.question, { foreignKey: 'questoId', as: 'questoes' });

db.users.hasMany(db.class, { as: 'turmas' });
db.class.belongsTo(db.users, { foreignKey: 'usuarioId', as: 'usuarios' });

sequelize.authenticate().then(() => {
    console.log('Connected with success!')
}).catch((err) => {
    console.log('Connection failed!')
});

module.exports = db;