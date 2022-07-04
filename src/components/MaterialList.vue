<template>
	<li class="cutlist">
		<div
			class="material"
			:class="{
				linear: listType == 'Linear',
				sheet: listType == 'Sheet',
			}"
		>
			<p>{{ name }}</p>
			<div v-if="total">
				<p v-if="listType == 'Linear'">Linear ft</p>
				<p v-else>Square ft</p>
				<p v-if="listType == 'Linear'">
					{{ displayInUnit(total) }}
				</p>
				<p v-else>{{ total }}</p>
			</div>
		</div>
		<ul class="cutlist-items">
			<li
				class="cutlist-item"
				:class="{
					linearItem: listType == 'Linear',
					sheetItem: listType == 'Sheet',
				}"
				v-for="item in cutlist"
				:key="item.key"
			>
				<div class="sheet-numbers">
					<p>{{ item[0] }}"</p>
					<p v-if="this.listType == 'Sheet'">x</p>
					<p v-if="this.listType == 'Sheet'">
						{{ item[1] }}"
					</p>
				</div>
				<p v-if="this.listType == 'Sheet'">
					QTY <span class="qty">{{ item[2] }}</span>
				</p>
				<p v-else>
					QTY <span class="qty">{{ item[1] }}</span>
				</p>
			</li>
			<li class="cutlist-item new-item">
				<div class="inputs">
					<div class="inputs-length-width">
						<p>
							<input
								placeholder="Length (in)"
								type="text"
								class="number-input"
								v-model="enteredValueLength"
							/>"
						</p>
						<p v-if="this.listType == 'Sheet'">
							<input
								placeholder="Width (in)"
								type="text"
								class="number-input"
								v-model="enteredValueWidth"
							/>"
						</p>
					</div>

					<input
						placeholder="QTY"
						type="number"
						class="qty-input"
						v-model="enteredValueQty"
					/>
				</div>

				<button
					class="btn"
					:class="{
						linear: listType == 'Linear',
						sheet: listType == 'Sheet',
					}"
					@click="newCutlistItem(this)"
				>
					Add
				</button>
			</li>
		</ul>
	</li>
</template>

<script>
export default {
	props: ['name', 'listType', 'cutlist', 'total'],
	emits: ['new-cutlist-item'],
	data() {
		return {
			unit: 'in',
			enteredValueQty: null,
			enteredValueLength: null,
			enteredValueWidth: null,
		};
	},
	methods: {
		displayInUnit(num) {
			//for feet and inches
			const feet = Math.floor(num);
			const inches = (num - Math.floor(num)) * 12;
			// const fraction = (inches - Math.floor(inches)) * 16;
			//Needs work
			return (
				feet +
				"'" +
				' ' +
				Math.round(inches) +
				' ' +
				// Math.round(fraction) +
				// '/' +
				// '16' +
				'"'
			);
		},
		newCutlistItem(obj) {
			this.$emit(
				'new-cutlist-item',
				obj,
				Number(this.enteredValueLength),
				Number(this.enteredValueQty),
				Number(this.enteredValueWidth)
			);
			//clear the inputs
			this.enteredValueLength = null;
			this.enteredValueQty = null;
			this.enteredValueWidth = null;
		},
	},
};
</script>
