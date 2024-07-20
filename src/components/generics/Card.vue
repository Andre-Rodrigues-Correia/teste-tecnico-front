<template>
  <div class="card">
    <v-card>
      <v-card-title class="d-flex justify-lg-space-between align-center">
        <span>{{ title }}</span>
        <v-btn @click="dialog = true" icon>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <component :is="component"></component>
      </v-card-text>
      <v-card-actions>
        <v-btn
            :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            @click="show = !show"
        ></v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-card-text>
            {{  resume  }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>

    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title>
          <span>{{ title }}</span>
          <v-btn @click="dialog = false" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text >
          <component :is="component" :isOpen="true"></component>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'AppCard',
  props: {
    title: {
      type: String,
      required: true
    },
    resume: {
      type: String,
      default: ''
    },
    component: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      show: false
    };
  }
};
</script>

