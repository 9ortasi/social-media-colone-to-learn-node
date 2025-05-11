const { DataTypes } = require("sequelize");


module.exports=(sequelize,DataTypes)=>{
    //define and expport the table with (table names, collumns and types)
    const Comments=sequelize.define("Comments",{
        comment:{
            type:DataTypes.STRING,
            allowNull:false
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
    })
    return Comments
}