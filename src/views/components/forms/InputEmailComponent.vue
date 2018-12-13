<script>
  import InputComponent from "./InputComponent";
  import InputMixin from "./InputMixin";

  export default {
    name: 'input-email-component',
    extends: InputComponent,
    data() {
      return {
        pattern: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      }
    },
    props: {
      type: {
        default: 'email'
      },
    },
    methods: {
      validate() {
        InputMixin.methods.validate.call(this);

        if (!(this.value.length === 0 || this.pattern.test(this.value))) {
          this.errors.push('The email entered is invalid!');
        }
      },
    }
  }
</script>
