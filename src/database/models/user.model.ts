import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import { hashSync } from 'bcrypt';

interface SafeUser {
    id: number,
    name: string,
    createdAt: any
}

class User extends Model implements SafeUser {
    declare id: number;
    declare name: string;
    declare password: string;
    declare createdAt: any;

    toSaveUser(): SafeUser {
        return {
            id: this.id,
            name: this.name,
            createdAt: this.createdAt
        }
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value: string) {
            this.setDataValue('password', hashSync(value, 10))
        }
    },

}, {
    sequelize,
    modelName: 'user',
    timestamps: true,
    createdAt: true,
    updatedAt: false
})

User.sync({ force: true });

export default User;