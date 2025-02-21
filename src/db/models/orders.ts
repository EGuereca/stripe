import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import dotenv from 'dotenv';
import User from './user';

dotenv.config();

interface OrderAttributes {
    id: number;
    cliente_id: number;
    estado: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public id!: number;
    public cliente_id!: number;
    public estado!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USERNAME!, process.env.DB_PASSWORD!, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
});

Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,  
    tableName: 'orders',
    timestamps: true,
});

Order.sync();

export default Order;



