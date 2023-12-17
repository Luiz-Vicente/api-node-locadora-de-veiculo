<template>
	<div class="container">
		<h2>CRUD de Veículos</h2>
		<h3>Adicionar Novo Veículo</h3>
		<div class="input-container">
			<label for="locadora">Locadora:</label>
			<input
				id="locadora"
				type="text"
				placeholder="Locadora"
				v-model="locadora"
			/>
		</div>
		<div class="input-container">
			<label for="modelo">Modelo:</label>
			<input
				id="modelo"
				type="text"
				placeholder="Modelo"
				v-model="modelo"
			/>
		</div>
		<div class="input-container">
			<label for="marca">Marca:</label>
			<input
				id="marca"
				type="text"
				placeholder="Marca"
				v-model="marca"
			/>
		</div>
		<div class="input-container">
			<label for="ano">Ano:</label>
			<input
				id="ano"
				type="text"
				placeholder="Ano"
				v-model="ano"
			/>
		</div>
		<label for="motor">Motor:</label>
		<div class="input-container">
			<input
				id="motor"
				type="text"
				placeholder="Motor"
				v-model="motor"
			/>
		</div>
		<div class="input-container">
			<label for="portas">Portas</label>
			<input
				id="portas"
				type="text"
				v-model="portas"
				placeholder="Portas"
			/>
			<div class="input-container">
				<label for="cambio">Câmbio:</label>
				<input
					id="cambio"
					type="text"
					placeholder="Cambio"
					v-model="cambio"
				/>
			</div>
		</div>
		<div class="input-container">
			<label for="ar-condicionado">Ar-Condicionado:</label>
			<input
				id="ar-condicionado"
				type="checkbox"
				v-model="arCondicionado"
				:true-value="true"
				:false-value="false"
			/>
		</div>
		<div class="button-container">
			<button
				class="btn-add"
				@click="save"
			>
				Adicionar
			</button>
			<button
				class="btn-update-list"
				@click="update"
			>
				Atualizar lista
			</button>
		</div>
	</div>
	<div class="list">
		<div class="list-header">
			<h6>Locadora</h6>
			<h6>Modelo</h6>
			<h6>Marca</h6>
			<h6>Ano</h6>
			<h6>Motor</h6>
			<h6>Portas</h6>
			<h6>Câmbio</h6>
			<h6>Ar-Condicionado</h6>
			<h6>Ações</h6>
		</div>
		<div
			class="list-body"
			v-for="(vehicle, index) in vehicles"
			:key="index"
			:style="isPar(Number(index))"
		>
			<div
				class="vehicle-item-list"
				v-if="isEditing === vehicle.id"
			>
				<div class="celula">
					<input
						class="celula"
						type="text"
						placeholder="Locadora"
						v-model="newLocadora"
					/>
				</div>
				<div class="celula">
					<input
						class="celula"
						type="text"
						placeholder="Modelo"
						v-model="newModelo"
					/>
				</div>
				<div class="celula">
					<input
						class="celula"
						type="text"
						placeholder="Marca"
						v-model="newMarca"
					/>
				</div>
				<div class="celula">
					<input
						class="celula"
						type="text"
						min="0"
						placeholder="Ano"
						v-model="newAno"
					/>
				</div>
				<div class="celula">
					<input
						class="celula"
						type="text"
						placeholder="Motor"
						v-model="newMotor"
					/>
				</div>
				<div class="celula">
					<input
						class="celula"
						type="text"
						v-model="newPortas"
						placeholder="Portas"
					/>
				</div>
				<div class="celula">
					<input
						class="celula"
						type="text"
						placeholder="Cambio"
						v-model="newCambio"
					/>
				</div>
				<div class="celula">
					<input
						type="checkbox"
						placeholder="Ar-Condicionado"
						v-model="newArCondicionado"
						:true-value="true"
						:false-value="false"
					/>
				</div>
				<div class="btn-list-container">
					<button
						class="btn-delete"
						@click="buttonDelete(vehicle.id)"
					>
						Excluir
					</button>
					<button
						class="btn-save"
						@click="updateVehicle(vehicle)"
					>
						Salvar
					</button>
				</div>
			</div>
			<div
				class="vehicle-item-list"
				v-else
			>
				<p class="locadora">{{ vehicle.locadora }}</p>
				<p class="modelo">{{ vehicle.modelo }}</p>
				<p class="marca">{{ vehicle.marca }}</p>
				<p class="ano">{{ vehicle.ano }}</p>
				<p class="motor">{{ vehicle.motor }}</p>
				<p class="portas">{{ vehicle.portas }}</p>
				<p class="cambio">{{ vehicle.cambio }}</p>
				<p class="ar-condicionado">{{ vehicle.ar_condicionado ? "Sim " : "Não" }}</p>
				<div class="btn-list-container">
					<button
						class="btn-delete"
						@click="buttonDelete(vehicle.id)"
					>
						Excluir
					</button>
					<button
						class="btn-edit"
						@click="toEdit(vehicle)"
					>
						Editar
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="js">
import api from "../axios";

export default {
	data() {
		return {
			isEditing: null,

			newId: null,
			newLocadora: null,
			newModelo: null,
			newMarca: null,
			newAno: null,
			newMotor: null,
			newPortas: null,
			newCambio: null,
			newArCondicionado: null,

			locadora: ``,
			modelo: ``,
			marca: ``,
			ano: ``,
			motor: ``,
			portas: ``,
			cambio: ``,
			arCondicionado: false,
			vehicles: []
		};
	},
	methods: {
		save() {
			if (
				this.locadora &&
				this.modelo &&
				this.marca &&
				this.ano &&
				this.motor &&
				this.portas &&
				this.cambio
			) {
				const vehicleData = {
					locadora: this.locadora,
					modelo: this.modelo,
					marca: this.marca,
					ano: Number(this.ano),
					motor: this.motor,
					portas: Number(this.portas),
					cambio: this.cambio,
					ar_condicionado: this.arCondicionado
				};

				api
					.post("/veiculos/", JSON.stringify(vehicleData))
					.then(response => {
						console.log(response);
						this.update();
					})
					.catch(error => {
						console.log(error);
					});
			} else {
				alert("Por favor, preencha todos os campos.");
			}
		},
		update() {
			api.get("/veiculos/")
				.then(response => {
					this.vehicles = response.data;
					this.update();
				})
				.catch(error => {
					console.log(error);
				});
		},
		buttonDelete(id) {
			console.log(id)
			api.delete(`/veiculos/${id}`)
				.then(response => {
					console.log(response)
					this.update();
				})
				.catch(error => {
					console.log(error);
				});
		},
		toEdit(vehicle) {
			this.isEditing = vehicle.id;
			this.newId = vehicle.id;
			this.newLocadora = vehicle.locadora;
			this.newModelo = vehicle.modelo;
			this.newMarca = vehicle.marca;
			this.newAno = vehicle.ano;
			this.newMotor = vehicle.motor;
			this.newPortas = vehicle.portas;
			this.newCambio = vehicle.cambio;
			this.newArCondicionado = vehicle.ar_condicionado;
		},
		updateVehicle() {
			if (
				this.newLocadora &&
				this.newModelo &&
				this.newMarca &&
				this.newAno &&
				this.newMotor &&
				this.newPortas &&
				this.newCambio
			) {
				const vehicleData = {
					locadora: this.newLocadora,
					modelo: this.newModelo,
					marca: this.newMarca,
					ano: Number(this.newAno),
					motor: this.newMotor,
					portas: Number(this.newPortas),
					cambio: this.newCambio,
					ar_condicionado: this.newArCondicionado
				};

				api.put(`/veiculos/${this.newId}`, JSON.stringify(vehicleData))
					.then(response => {
						console.log(response);
						this.update();
					})
					.catch(error => {
						console.log(error);
					});

				this.isEditing = null;
			}
		},
		isPar(numero) {
			if(numero % 2 === 0){
				return 'background-color: rgb(202, 193, 193)';
			}

			return 'background-color: light-dark';
		}
	}
};
</script>

<style lang="css" scoped>
input[type="text"] {
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	width: 100%;
	box-sizing: border-box;
	margin-bottom: 3px;
	margin-left: 5px;
}

.container {
	padding: 20px;
}

label {
	font-weight: 600;
	color: #101010;
	margin-left: 5px;
}

.btn-add,
.btn-update-list {
	padding: 10px 20px;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 16px;
	margin-right: 10px;
	margin-top: 10px;
}

button-container button {
	display: block;
	margin-bottom: 10px;
}

.btn-add:hover,
.btn-update-list:hover {
	background-color: #0056b3;
}

h2,
h3 {
	color: #101010;
	text-align: left;
	margin-top: auto;
	margin-left: 5px;
}

.vehicle {
	display: flex;
	color: #000;
}

p {
	font-size: 19px;
	padding: 4px;
}

.list {
	margin-top: 40px;
	padding: 0px 16px;
}

.list-header {
	display: flex;
	border-bottom: 1px solid #101010;
}

.list-header h6 {
	font-size: 18px;
	font-weight: bold;
	color: #101010;
	margin: 0;
	padding: 8px;
	width: 11.11%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.vehicle-item-list {
	padding: 10px 0px;
	display: flex;
}

.vehicle-item-list p,
.btn-list-container {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #101010;
	text-align: start;
	align-self: center;
	margin: 0;
	padding: 8px;
	width: 11% !important;
}

.vehicle-item-list input {
	margin: 0px;
}

.btn-list-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.celula {
	align-self: center;
	width: 11%;
	padding: 8px;
}

.btn-list-container button {
	width: 80%;
	margin-bottom: 4px;
	padding: 10px 20px;
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 12px;
}

.btn-list-container button:hover {
	opacity: 80%;
}

.btn-save {
	background-color: #007bff;
}

.btn-delete {
	background-color: #d40f0f;
}

.btn-edit {
	background-color: #007bff;
}
</style>
