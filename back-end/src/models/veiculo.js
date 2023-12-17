"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Veiculo extends Model {}
	Veiculo.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			locadora: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			modelo: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			marca: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			ano: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: true,
					isNumeric: true,
					notEmpty: true,
				},
			},
			motor: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			portas: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: true,
					isNumeric: true,
					notEmpty: true,
				},
			},
			cambio: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			ar_condicionado: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
		},
		{
			sequelize,
			modelName: "Veiculo",
		}
	);

	return Veiculo;
};
