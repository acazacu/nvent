export default {
  methods: {
    validate() {
      const errors = [];

      if (this.required && this.value.length === 0) {
        errors.push("This field is required.");
      }

      this.errors = errors;
    }
  }
};
