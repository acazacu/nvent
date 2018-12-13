export default {
  props: {
    value: {
      required: true,
    },
    placeholder: {
      type: [ String, Number ]
    },
    label: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    id: {
      type: String,
      default: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    },
    name: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      errors: []
    }
  },

  computed: {
    isValid: function() {
      return this.errors.length === 0;
    },
  },

  mounted() {
    this.registerField(this);
  },

  beforeDestroy() {
    this.deregisterField(this);
  },

  inject: [ 'registerField', 'deregisterField' ],

  methods: {
    validate() {
      const errors = [];

      if (this.required && this.value.length === 0) {
        errors.push('This field is required.')
      }

      this.errors = errors;
    },
  },
}
