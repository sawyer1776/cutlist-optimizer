<template>
	<section id="main-section">
		<header>
			<h1 class="heading">Build Your Cutlist</h1>
		</header>

		<ul class="materials container">
			<material-list
				v-for="object in cutlists"
				:key="object.key"
				v-bind:list-type="object.listType"
				v-bind:name="object.name"
				v-bind:cutlist="object.cutlist"
				@new-cutlist-item="newItem"
			></material-list>

			<li class="add-new-stock">
				<h2>Add a new stock size</h2>
				<input
					type="text"
					placeholder='Description (eg; "2x4")'
					v-model="enteredValueName"
				/>
				<div class="new-stock-btns">
					<button
						class="btn sheet"
						@click="addNewMaterial('Sheet')"
					>
						Sheet
					</button>
					<p>Or</p>
					<button
						class="btn linear"
						@click="addNewMaterial('Linear')"
					>
						Linear
					</button>
				</div>
			</li>
		</ul>
	</section>
</template>

<script>
import MaterialList from './components/MaterialList.vue';

export default {
	components: { MaterialList },
	data() {
		return {
			cutlists: {
				// 1: {
				// 	id: 1,
				// 	name: '4x4 Beams',
				// 	listType: 'Linear',
				// 	cutlist: [
				// 		[18, 5],
				// 		[36, 2],
				// 		[57, 3],
				// 	],
				// },
				// 2: {
				// 	name: '2x6',
				// 	listType: 'Linear',
				// 	cutlist: [
				// 		[23, 6],
				// 		[36, 2],
				// 		[57, 3],
				// 	],
				// },
				// 3: {
				// 	name: '3/4 plywood',
				// 	listType: 'Sheet',
				// 	cutlist: [
				// 		[36, 24, 5],
				// 		[12.25, 16, 2],
				// 		[57, 3.25, 3],
				// 	],
				// },
			},

			enteredValueName: null,
		};
	},

	methods: {
		newItem(obj, length, qty) {
			if (length && qty) {
				obj.cutlist.push([length, qty]);
			}
		},
		addBtnClick() {
			this.newMaterialActive = false;
		},
		addNewMaterial(type) {
			//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names

			let value = this.enteredValueName;
			this.cutlists[value] = {
				name: this.enteredValueName,
				listType: type,
				cutlist: [],
			};
			this.enteredValueName = null;
		},
	},
};
</script>

<style>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	font-size: 62.5%;
}

:root {
	--small: 2rem;
	--medium: 3rem;
	--large: 4rem;

	--color-main: #4f86c0;
	--color-light: #89a6c5;
	--color-sheet: #d92323;
	--color-sheet-light: #c58989;
	--color-linear: #258588;
	--color-linear-light: #89c3c5;
	--wht: rgb(255, 255, 255);
}

html {
	font-family: 'Jost', sans-serif;
}

body {
	margin: 0;
}

header {
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	margin: 3rem auto;
	border-radius: 10px;
	padding: 1rem;
	background-color: var(--color-main);
	color: white;
	text-align: center;
	width: 90%;
	max-width: 65rem;
}

.heading {
	font-size: var(--large);
}

.btn {
	padding: 1rem 2rem;
	font-size: var(--small);
	background-color: var(--color-main);
	border: none;
	color: var(--wht);
	border-radius: 0.5rem;
}

.container {
	margin: 3rem auto;
	width: 90%;
	max-width: 40rem;
}

.materials {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	list-style: none;
	align-items: center;
}

.material {
	display: flex;
	gap: 1.5rem;
	font-size: var(--medium);
	padding: 1rem 2rem;
	justify-content: space-between;
	border-radius: 1rem;
	margin-bottom: 1rem;
}

.cutlist-item {
	padding: 0.5rem 2rem;
	display: flex;
	justify-content: space-between;
	font-size: var(--small);
	border-radius: 0.5rem;
}
.sheet {
	background-color: var(--color-sheet);
	color: var(--wht);
}

.sheetItem {
	background-color: var(--color-sheet-light);
}

.linear {
	background-color: var(--color-linear);
	color: var(--wht);
}

.linearItem {
	background-color: var(--color-linear-light);
}

.new-item {
	box-shadow: 0.5rem 0.5rem 1.5rem 0.25rem
		rgba(0, 0, 0, 0.15);
	margin-bottom: 2rem;
}

.add-new-stock {
	width: 100%;
	font-size: var(--small);
	box-shadow: 0.5rem 0.5rem 1.5rem 0.25rem
		rgba(0, 0, 0, 0.15);
	margin-bottom: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	padding: 1rem;
}
.add-new-stock input {
	height: 3rem;
}

.new-stock-btns {
	display: flex;
	gap: 1rem;
	align-items: center;
}

.qty {
	font-size: var(--small);
}

.number-input {
	width: 5rem;
	height: 3rem;
}

.cutlist {
	width: 100%;
}

.cutlist-items {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin-left: 3rem;
	/* background-color: var(--color-linear-light); */
}

p {
	font-size: inherit;
}
</style>
