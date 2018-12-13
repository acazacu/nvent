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
      type: Number
    }
  },
  methods: {
    validate() {
      InputMixin.methods.validate.call(this);

      if (this.minimumCharacters) {
        const valueLength = this.value.length;

        if (!(valueLength === 0 || valueLength >= this.minimumCharacters)) {
          this.errors.push(
            `This field must contain at least ${this.minimumCharacters} characters.`
          );
        }
      }
    }
  }
};
</script>
