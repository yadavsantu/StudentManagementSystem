module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define('student', {
        std_name: {
            type: Sequelize.STRING
        },
        std_address: {
            type: Sequelize.STRING
        },
        std_age: {
            type: Sequelize.INTEGER,
        },
        std_fees: {
            type: Sequelize.FLOAT,
        },
        std_level: {
            type: Sequelize.STRING
        },
        std_image: {
            type: Sequelize.STRING
        },
    })

    return Student
}