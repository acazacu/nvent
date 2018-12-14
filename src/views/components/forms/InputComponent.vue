<template>
  <div class="field" v-bind:class="{ 'field-invalid': !isValid }">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      :id="id"
      :name="name"
      v-if="type !== 'textarea'"
      :type="type"
      ref="input"
      :value="value"
      :placeholder="placeholder"
      @input="onInputInput"
      @change="onInputChange"
    />
    <textarea
      :id="id"
      :name="name"
      v-if="type === 'textarea'"
      ref="input"
      :value="value"
      :placeholder="placeholder"
      @input="onInputInput"
      @change="onInputChange"
    ></textarea>
    <ul v-if="errors.length > 0">
      <li v-for="error of errors">{{ error }}</li>
    </ul>
  </div>
</template>
<style lang="scss">
.field {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  justify-items: stretch;
  z-index: 1;

  input,
  textarea {
    padding: 4px;
    border: 1px solid lightgray;
  }

  textarea {
    min-height: 200px;
  }

  &-invalid {
    ul {
      list-style: none inside;
      margin-top: 8px;
      font-size: 12px;
      color: red;
    }

    input,
    textarea {
      border: 1px solid darkred;
      background-color: lightpink;
    }
  }
}
</style>
<script>
import InputMixin from "./InputMixin";

export default {
  name: "input-component",
  mixins: [InputMixin],
  inject: ["registerField", "deregisterField"],

  mounted() {
    if (this.registerField) {
      this.registerField(this);
    }
  },

  beforeDestroy() {
    if (this.deregisterField) {
      this.deregisterField(this);
    }
  },

  data() {
    return {
      errors: []
    };
  },

  props: {
    value: {
      required: true
    },
    placeholder: [String, Number],
    label: String,
    required: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "text"
    },
    id: {
      type: String,
      default: Math.random()
        .toString(36)
        .substring(2, 15)
    },
    name: {
      type: String,
      required: true
    }
  },

  computed: {
    isValid: function() {
      return this.errors.length === 0;
    }
  },

  methods: {
    onInputInput(e) {
      this.$emit("input", e);
    },

    onInputChange() {
      this.validate();
    },

    checkValidity() {
      this.validate();

      return this.isValid;
    }
  }
};
</script>