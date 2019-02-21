<template>
  <div class="field" v-bind:class="{ 'field-invalid': !isValid }">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      v-if="type !== 'textarea'"
      autocomplete="off"
      :id="id"
      :name="name"
      :type="type"
      ref="input"
      :value="value"
      :placeholder="placeholder"
      @input="onInputInput"
      @change="onInputChange"
    />
    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :name="name"
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
@import "../../styles/colors";
@import "../../styles/typography";

.field {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  justify-items: stretch;
  z-index: 1;

  input,
  textarea {
    border: 1px solid $color-low-contrast-light;
  }

  textarea {
    min-height: 9rem;
  }

  &-invalid {
    ul {
      list-style: none inside;
      margin: 8px 0 0 0;
      padding: 0;
      color: $color-negative;
      @include copy($scale0);
    }

    input,
    textarea {
      border: 1px solid darken($color-negative, 10%);
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
    this.registerField(this);
  },

  beforeDestroy() {
    this.deregisterField(this);
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
    }
  }
};
</script>
