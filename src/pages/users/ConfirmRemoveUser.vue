<template>
    <q-dialog persistent>
        <q-card>
            <q-card-section class="row items-center">
                <q-avatar icon="delete" color="red" text-color="white" />
                <span class="q-ml-sm">Are you sure you want to remove this user? ({{ firstName + " " + lastName }}) This cannot be undone.</span>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="Delete" color="red" v-close-popup @click="peopleSt.removeUser(firstName, lastName)"/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
    import { usePeople } from 'src/stores/usePeople';

    const peopleSt = usePeople()

    export default {
        setup() {
            return {
                peopleSt
            }
        },
        props: {
            firstName: String,
            lastName: String
        }
    }
</script>