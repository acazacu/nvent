<script>
  import InputComponent from "./InputComponent";

  export default {
    name: 'input-text-component',
    extends: InputComponent,
    props: {
      type: {
        default: 'text'
      },
    },
  }
</script>
