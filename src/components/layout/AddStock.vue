<template>
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
				@click="newMaterial('Sheet')"
			>
				Sheet
			</button>
			<p>Or</p>
			<button
				class="btn linear"
				@click="newMaterial('Linear')"
			>
				Linear
			</button>
		</div>
	</li>
</template>

<script>
export default {
	emits: ['new-material'],
	data() {
		return {
			enteredValueName: null,
		};
	},
	methods: {
		newMaterial(type) {
			this.$emit(
				'new-material',
				type,
				this.enteredValueName
			);
			//reset
			this.enteredValueName = null;
		},
	},
};
</script>
