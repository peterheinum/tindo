<template>
  <div>
    hey
    <vue-dropzone ref="myVueDropzone" @vdropzone-sending="removeFile" @vdropzone-file-added="doStuff" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
  </div>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
  name: "app",
  components: {
    vueDropzone: vue2Dropzone
  },
  mounted() {
    console.log("yeet");
  },
  methods: {
    doStuff(e) {
      this.checkFile(e)
    },
    checkFile(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const json = JSON.parse(e.target.result)
      };
      reader.readAsDataURL(file);
    },
    removeFile(file) {
    }
  },
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" },
        
      }
    };
  }
};
</script>

<style>
</style>
