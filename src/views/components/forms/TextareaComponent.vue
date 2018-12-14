<script>
import InputComponent from "./InputComponent";
import InputMixin from "./InputMixin";

export default {
  name: "textarea-component",
  extends: InputComponent,
  props: {
    type: {
      default: "textarea"
    },
    minimumCharacters: {
      type: Number,
      default: 0
    }
  },
  methods: {
    validate() {
      const errors = InputMixin.methods.validate.call(this);

      const valueLength = this.value.length;

      if (
        this.minimumCharacters !== 0 &&
        !(valueLength === 0 || valueLength >= this.minimumCharacters)
      ) {
        errors.push(`This field must contain at least ${this.minimumCharacters} characters.`);
      }

      this.errors = errors;

      return errors;
    }
  }
};
</script>
