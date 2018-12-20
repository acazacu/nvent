<template>
  <form ref="form" @submit.prevent="onSubmit">
    <div class="form-items"><slot></slot></div>
    <div class="form-controls">
      <a data-rel="cancel-button" @click="onCancel" title="Go back">Go back</a>
      <button class="button button-primary" data-rel="submit-button" type="submit">Send</button>
    </div>
  </form>
</template>
<style lang="scss">
form {
  display: flex;
  flex-direction: column;
  position: relative;

  .form-items > * {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .form-controls {
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
  }
}
</style>
<script>
export default {
  name: "form-component",
  data() {
    return {
      fields: []
    };
  },
  provide() {
    return {
      registerField: this.registerField,
      deregisterField: this.deregisterField
    };
  },
  methods: {
    onSubmit(e) {
      if (this.isValid()) {
        this.$emit("submit", e);
      }
    },

    onCancel() {
      this.$emit("cancel");
    },

    isValid() {
      return this.fields.map(field => field.validate().length === 0).every(result => result);
    },

    registerField(field) {
      this.fields.push(field);
    },

    deregisterField(field) {
      const index = this.fields.indexOf(field);

      this.fields.splice(index, 1);
    }
  }
};
</script>
