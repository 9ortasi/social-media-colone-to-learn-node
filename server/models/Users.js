module.exports=(sequelize,DataTypes)=>{
    //define and expport the table with (table names, collumns and types)
    const Users=sequelize.define("Users",{
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },

    })
    Users.associate=(models)=>{
        Users.hasMany(models.Likes,{onDelete:"cascade",})
    }
    return Users
}