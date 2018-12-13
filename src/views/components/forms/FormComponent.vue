<template>
  <form ref="form" @submit.prevent="onSubmit">
    <div class="form-items">
      <slot></slot>
    </div>
    <div class="form-controls">
      <a data-rel="cancel-button" @click="onCancel" title="Cancel">Cancel</a>
      <button type="submit">Send</button>
    </div>
    <div data-rel="load-mask" v-if="loading" class="load-mask"></div>
  </form>
</template>
<style lang="scss">
  form {
    display: flex;
    flex-direction: column;
    position: relative;

    .form-items > * {
      margin: 8px 0;
    }

    .form-controls {
      margin: 16px 0 8px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1;

      a {
        color: blue;

        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }

      button[type="submit"] {
        background: lightblue;
        padding: 8px 16px;
        border-radius: 2px;
        color: darken(darkgrey, 35%);

        &:hover {
          cursor: pointer;
          background: darken(lightblue, 15%);
          color: darken(darkgrey, 50%);
          box-shadow: 0 0 1px 1px darken(lightblue, 15%);
        }
      }
    }

    .load-mask {
      position: absolute;
      z-index: 2;
      background-color: white;
      opacity: .5;
      width: 100%;
      height: 100%;
    }
  }
</style>
<script>
  export default {
    name: 'form-component',
    props: {
      submitHandler: {
        type: Function,
        required: true
      },
      abortHandler: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        fields: [],
        loading: false,
      }
    },
    provide() {
      return {
        registerField: this.registerField,
        deregisterField: this.deregisterField,
      }
    },
    methods: {
      async onSubmit() {
        const valid = this.fields
          .map(field => {
            field.validate();
            return field.errors.length === 0;
          })
          .every(result => result);

        if (valid) {
          this.loading = true;
          await this.submitHandler();
          this.loading = false;
        }
      },
      onCancel() {
        this.abortHandler();
      },
      registerField(field) {
        this.fields.push(field);
      },

      deregisterField(field) {
        const index = this.fields.indexOf(field);

        this.fields.splice(index, 1)
      },
    },
  }
</script>
