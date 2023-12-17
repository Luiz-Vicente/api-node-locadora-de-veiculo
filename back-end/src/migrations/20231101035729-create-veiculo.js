"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Veiculos", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			locadora: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			modelo: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			marca: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			ano: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			motor: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			portas: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			cambio: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			ar_condicionado: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Veiculos");
	},
};
