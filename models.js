const Sequelize = require ('sequelize');
Sequelize.postgres.DECIMAL.parse = function (value) { return parseFloat(value); };
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/project_4_give_back_db', {
  dialect: 'postgres'
});

// Create models here
const User = sequelize.define('user', {
    fullName: Sequelize.TEXT,
    dob: Sequelize.DATEONLY,
    address: Sequelize.TEXT,
    username: Sequelize.TEXT,
    passwordDigest: { type: Sequelize.TEXT, unique: true },
    email: Sequelize.TEXT,
    profilePicture: Sequelize.TEXT,
    score: {type: Sequelize.INTEGER, defaultValue: 0},
});

const VolunteeringOpportunity = sequelize.define('volunteeringOpportunity', {
    title: Sequelize.TEXT,
    address: Sequelize.TEXT,
    description: Sequelize.TEXT,
    latitude: Sequelize.DECIMAL,
    longitude: Sequelize.DECIMAL,
    duration: Sequelize.TEXT,
    organization: Sequelize.TEXT,
    organizationURL: Sequelize.TEXT
});

const VolunteerExperience = sequelize.define('volunteerExperience', {
    rating: {type: Sequelize.INTEGER, defaultValue: null},
    comment: Sequelize.TEXT
});

User.belongsToMany(VolunteeringOpportunity, { through: VolunteerExperience });
VolunteeringOpportunity.belongsToMany(User, { through: VolunteerExperience });

// Export models
module.exports = {
    User,
    VolunteeringOpportunity,
    VolunteerExperience,
    sequelize: sequelize
  };