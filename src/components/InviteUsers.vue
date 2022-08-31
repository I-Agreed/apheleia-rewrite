<template>
    <q-card style="width: 100%;">
        <!-- Title -->
        <q-card-section>
          <h3 style="margin-top: 10px; margin-bottom: 20px;">Invite Users</h3>
        </q-card-section>

        <!-- subtitle -->
        <q-card-section class="q-pt-none">
          Use this link to invite users:
        </q-card-section>

        <!-- text box -->
        <q-card-section style="padding-top: 0px;">
            <q-field outlined stack-label>
                <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{ url }}</div>
                </template>
            </q-field>
        </q-card-section>

        <!-- ok button -->
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
    </q-card>
</template>
  
<script>
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'InviteUsers',
    props: {
        url: {
            type: String,
            required: true
        },
    }
  })
</script>