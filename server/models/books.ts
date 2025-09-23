const dB = require("../config/db/db.ts");

const { Model, DataTypes } = require("sequelize");

class Book extends Model<any, any> {
  public id!: number;
  public title!: string;
  public author!: string;
  public description!: string;
  public price!: string;
  public cover_url!: string;
  public content_url!: string;
  public createdAt!: string;
  public updatedAt!: string;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(0, 2),
      allowNull: false,
    },
    cover_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "books",
    sequelize: dB,
    modelName: "books",
  }
);
module.exports = Book;
