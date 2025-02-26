import { DataTypes, Sequelize, Model, Optional } from "sequelize";
require('dotenv').config();

interface ProductAttributes {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> { }

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public price!: number;
    public stock!: number;
    public image!: string;
}

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USERNAME!, process.env.DB_PASSWORD!, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
});

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'products',
    }
);

Product.sync();
export default Product;
