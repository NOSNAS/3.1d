<script>

import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const center = { lat: 40.689247, lng: -74.044502 };

    return { center };
  },
});

</script>

<template>
  <main>
    Home Page
    <!-- <TheWelcome /> -->
  </main>
  <GoogleMap api-key="AIzaSyBCM-WLy6WDBwWNEGJbRRdiYsIgWGQUPgE" style="width: 100%; height: 500px" :center="center" :zoom="15">
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<style scoped>

</style>
