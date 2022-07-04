<template>
	<the-header></the-header>
	<section id="main-section">
		<ul class="materials container">
			<material-list
				v-for="object in cutlists"
				:key="object.key"
				v-bind:list-type="object.listType"
				v-bind:name="object.name"
				v-bind:cutlist="object.cutlist"
				v-bind:total="object.totalNum"
				@new-cutlist-item="newItem"
			></material-list>
			<add-stock @new-material="addNewMaterial"></add-stock>
		</ul>
	</section>
</template>

<script>
import MaterialList from './components/MaterialList.vue';
import TheHeader from './components/layout/TheHeader.vue';
import AddStock from './components/layout/AddStock.vue';

export default {
	components: { MaterialList, TheHeader, AddStock },
	data() {
		return {
			cutlists: {
				// '4x4 Beams': {
				// 	name: '4x4 Beams',
				// 	listType: 'Linear',
				// 	cutlist: [
				// 		[18, 5],
				// 		[36, 2],
				// 		[57, 3],
				// 	],
				// 	totalNum: 47,
				// },
				// '2x6': {
				// 	name: '2x6',
				// 	listType: 'Linear',
				// 	cutlist: [
				// 		[23, 6],
				// 		[36, 2],
				// 		[57, 3],
				// 	],
				// 	totalNum: 89,
				// },
				// '3/4 plywood': {
				// 	name: '3/4 plywood',
				// 	listType: 'Sheet',
				// 	cutlist: [
				// 		[36, 24, 5],
				// 		[12.25, 16, 2],
				// 		[57, 3.25, 3],
				// 	],
				// 	totalNum: 16,
				// },
			},

			enteredValueName: null,
		};
	},

	methods: {
		newItem(obj, length, qty, width) {
			//if the item is sheet
			if (obj.listType == 'Sheet') {
				if (length && width && qty) {
					obj.cutlist.push([length, width, qty]);
				}
			}

			//if the item is linear
			if (obj.listType == 'Linear') {
				if (length && qty) {
					obj.cutlist.push([length, qty]);
				}
			}
			this.calcTotal(obj);
		},

		addNewMaterial(type, enteredName) {
			//fired on the addNewMaterial emit
			//type should be 'Sheet' or 'Linear'
			//entered name is a user input

			this.cutlists[enteredName] = {
				name: enteredName,
				listType: type,
				cutlist: [],
			};

			console.log(this.cutlists);
		},
		roundToThree(num) {
			return Number.parseFloat(num).toFixed(3);
		},

		calcLinear(material) {
			material.cutlist.forEach((item) => {
				material.totalNum += item[0] * item[1];
			});
			material.totalNum = this.roundToThree(
				material.totalNum / 12
			);
		},
		calcArea(material) {
			material.cutlist.forEach((item) => {
				material.totalNum += item[0] * item[1] * item[2];
			});
			material.totalNum = this.roundToThree(
				material.totalNum / 144
			);
		},
		calcTotal(obj) {
			const postition = obj.name;
			const material = this.cutlists[postition];
			material.totalNum = 0;

			if (obj.listType == 'Linear') {
				this.calcLinear(material);
			}
			if (obj.listType == 'Sheet') {
				this.calcArea(material);
			}
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
	--color-light: #b1c9e3;
	--color-sheet: #ce2121;
	--color-sheet-light: #f4dfdf;
	--color-linear: #126e71;
	--color-linear-light: #daf4f5;
	--wht: rgb(255, 255, 255);
	--color-dark: #222828;
}

html {
	font-family: 'Jost', sans-serif;
}

body {
	margin: 0;
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
.inputs {
	display: flex;
	font-size: inherit;
	justify-content: space-between;
	width: 100%;
	padding-right: 1rem;
}

.inputs-length-width {
	font-size: inherit;
	display: flex;
	gap: 1rem;
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
	box-shadow: 0rem 0.75rem 0.75rem 0.25rem
		rgba(0, 0, 0, 0.055);
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
	width: 7rem;
	height: 3rem;
}

.qty-input {
	width: 5rem;
	height: 3rem;
}

.cutlist {
	width: 100%;
}
.sheet-numbers {
	font-size: inherit;
	display: flex;
	gap: 0.75rem;
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
