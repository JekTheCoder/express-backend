import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import User from './user.model';

class Note extends Model {
    declare id: number;
    declare content: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Note.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, 
{
    sequelize,
    modelName: 'post',
    timestamps: true
});

Note.belongsTo(User);

export default Note;