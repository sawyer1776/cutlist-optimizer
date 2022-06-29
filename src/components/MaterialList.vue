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
			<p>{{ object }}</p>
			<p class="type">{{ listType }}</p>
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
				<p>{{ item[0] }}"</p>
				<p>
					QTY <span class="qty">{{ item[1] }}</span>
				</p>
			</li>
			<li class="cutlist-item new-item">
				<p>
					<input
						type="text"
						class="number-input"
						v-model="enteredValueLength"
					/>" Length
				</p>
				<p>
					QTY
					<input
						type="number"
						class="number-input"
						v-model="enteredValueQty"
					/>
				</p>
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
	props: ['name', 'listType', 'cutlist'],
	emits: ['new-cutlist-item'],
	data() {
		return {
			enteredValueQty: null,
			enteredValueLength: null,
		};
	},
	methods: {
		newCutlistItem(obj) {
			this.$emit(
				'new-cutlist-item',
				obj,
				this.enteredValueLength,
				this.enteredValueQty
			);
      //clear the inputs
			this.enteredValueLength = null;
			this.enteredValueQty = null;
		},
	},
};
</script>
