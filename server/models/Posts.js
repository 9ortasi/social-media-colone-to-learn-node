const { DataTypes } = require("sequelize");


module.exports=(sequelize,DataTypes)=>{
    //define and expport the table with (table names, collumns and types)
    const Posts=sequelize.define("Posts",{
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        postText:{
            type:DataTypes.STRING,
            allowNull:false
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })

    Posts.associate=(models)=>{
        Posts.hasMany(models.Comments,{onDelete:"cascade",})
        Posts.hasMany(models.Likes,{onDelete:"cascade",})
    }

    return Posts
}