<script>
import InputComponent from "./InputComponent";
import InputMixin from "./InputMixin";

export default {
  name: "input-email-component",
  extends: InputComponent,
  props: {
    type: {
      default: "email"
    },
    pattern: {
      type: String,
      default:
        "^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
    }
  },
  methods: {
    validate() {
      const errors = InputMixin.methods.validate.call(this);

      const pattern = new RegExp(this.pattern);

      if (!(this.value.length === 0 || pattern.test(this.value))) {
        errors.push("The email entered is invalid!");
      }

      this.errors = errors;

      return errors;
    }
  }
};
</script>
