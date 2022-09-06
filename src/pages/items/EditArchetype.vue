<template>
    <q-dialog full-width v-model="editArc">
        <q-card style="height: 100%;">
            <div class="q-pa-md">
                <!-- Header -->
                <div class="wide-flexbox" style="padding-bottom: 1em;">
                    <h3 style="margin-top: 1vh; margin-bottom: 1vh;">Edit Item Type</h3>
                    <span></span>
                    <CloseButton/>
                </div>

                <!-- Archtype table -->
                <q-table hide-bottom
                         row-key="property"
                         style="height: 83vh;"
                         separator="cell"
                        :rows="inventorySt.archetypeRows(itemsSt.focused_archetype)"
                        :columns="archColumns"
                        :rows-per-page-options="[0]" >
                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <!-- Modify the rows of the property column to make them editable -->
                            <q-td key="property" :props="props">
                                {{ props.row.property }}
                                <q-popup-edit buttons
                                              v-model="props.row.property"
                                              v-slot="scope"
                                             :title="`Update Property`"
                                             @save="(val) => inventorySt.setArchetypeFieldName(inventorySt.getSchemeId(itemsSt.focused_archetype), props.rowIndex, val)">
                                    <q-input v-model="scope.value" dense autofocus />
                                </q-popup-edit>
                            </q-td>
                            
                            <!-- Modify the rows of the property type column to make them editable as a dropdown -->
                            <q-td key="propertyType" :props="props">
                                <q-select outlined
                                          v-model="props.row.propertyType"
                                         :options="['text', 'number', 'selection', 'date', 'checkbox']"
                                         @update:model-value="(val) => inventorySt.setArchetypePropertyType(inventorySt.getSchemeId(itemsSt.focused_archetype), props.rowIndex, val)"/>
                            </q-td>

                            <!-- Modify the rows of the default value column to make them editable depending on the type -->
                            <q-td key="defaultValue" :props="props">
                                <!-- Plain text editing for text type -->
                                <div v-if="props.row.propertyType === 'text'">
                                    {{ props.row.defaultValue }}
                                    <q-popup-edit buttons
                                                  v-model="props.row.defaultValue"
                                                  v-slot="scope"
                                                 :title="`Update Property Default`"
                                                 @save="(val) => inventorySt.setArchetypeDefaultField(inventorySt.getSchemeId(itemsSt.focused_archetype), props.rowIndex, val)">
                                        <q-input v-model="scope.value" dense autofocus />
                                    </q-popup-edit>
                                </div>

                                <!-- Editing for number type -->
                                <div v-if="props.row.propertyType === 'number'">
                                    {{ props.row.defaultValue }}
                                    <q-popup-edit buttons
                                                  v-model="props.row.defaultValue"
                                                  v-slot="scope"
                                                 :title="`Update Property Default`"
                                                 @save="(val) => inventorySt.setArchetypeDefaultField(inventorySt.getSchemeId(itemsSt.focused_archetype), props.rowIndex, val)">
                                        <q-input v-model="scope.value" dense autofocus />
                                    </q-popup-edit>
                                </div>

                                <!-- A list of text input boxes for the selection type -->
                                <div v-if="props.row.propertyType === 'selection'">
                                    <div v-for="(val, index) in props.row.defaultValue" style="display: flex;">
                                        <q-input outlined
                                                 v-model="val.value"
                                                 style="margin-top: 10px; width: 95%;"
                                                @focus="inventorySt.focusedSelection = val.value"
                                                @update:model-value="(v) => {
                                                    inventorySt.modifyArchetypeDefaultFieldSelection(inventorySt.getSchemeId(itemsSt.focused_archetype), props.rowIndex, index, v);
                                                    inventorySt.focusedSelection = val.value
                                                 }"/>
                                        
                                        <!-- Delete button for each input box -->
                                        <q-btn flat round color="red" icon="delete" style="margin-left: 0.6vw;"
                                              @click="confirmSel=true;
                                                      deleteSelected = [inventorySt.getSchemeId(itemsSt.focused_archetype), props.rowIndex, index]"/>
                                    </div>

                                    <!-- + button to add more input boxes -->
                                    <q-btn color="primary" label="+" style="height: 70%; width: 10%; margin-top: 1vh;"
                                          @click="inventorySt.addArchetypeDefaultFieldSelection(inventorySt.getSchemeId(itemsSt.focused_archetype), props.rowIndex)"/>
                                </div>

                                <!-- Date input for the date type -->
                                <div v-if="props.row.propertyType === 'date'">
                                    <q-input filled v-model="props.row.defaultValue" type="date"
                                            @update:model-value="(val) => inventorySt.setArchetypeDefaultField(inventorySt.getSchemeId(itemsSt.focused_archetype), props.rowIndex, val)"/>
                                </div>

                                <!-- Checkbox input for the checkbox type -->
                                <div v-if="props.row.propertyType === 'checkbox'">
                                    <q-checkbox v-model="props.row.defaultValue"
                                               @update:model-value="(val) => inventorySt.setArchetypeDefaultField(inventorySt.getSchemeId(itemsSt.focused_archetype), props.rowIndex, val)"/>
                                </div>
                            </q-td>

                            <!-- Delete button on the right side of each property on table -->
                            <q-td key="delete" :props="props">
                                <q-btn flat round color="red" icon="delete"
                                      @click="confirmProp = true; deleteSelected = [inventorySt.getSchemeId(itemsSt.focused_archetype), props.rowIndex]"/>
                            </q-td>
                        </q-tr>
                    </template>
                </q-table>

                <!-- New Property and Save buttons -->
                <q-btn color="primary" label="New Property" style="height: 70%; width: 10%; margin-top: 1vh;"
                      @click="inventorySt.newProperty(inventorySt.getSchemeId(itemsSt.focused_archetype))" />
                <q-btn color="primary" label="Close" style="height: 70%; width: 10%; margin-left: 1vw; margin-top: 1vh;" v-close-popup/>
            </div>
        </q-card>

        
        <!-- Confirm delete property dialogue -->
        <q-dialog v-model="confirmProp" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar icon="delete" color="red" text-color="white" />
                    <span class="q-ml-sm">Are you sure you want to delete this property? This cannot be undone.</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn flat label="Delete" color="red" v-close-popup @click="inventorySt.deleteProperty(deleteSelected[0], deleteSelected[1]);"/>
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- Confirm delete selection field dialogue -->
        <q-dialog v-model="confirmSel" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar icon="delete" color="red" text-color="white" />
                    <span class="q-ml-sm">Are you sure you want to delete this field? This cannot be undone.</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn flat label="Delete" color="red" v-close-popup @click="inventorySt.removeArchetypeDefaultFieldSelection(deleteSelected[0], deleteSelected[1], deleteSelected[2]);"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-dialog>
</template>

<script>
    import { defineComponent } from 'vue'
    import { ref } from 'vue'
    
    import { useInventory } from '../../stores/useInventory.js'
    import { itemsLocal } from '../../stores/itemsLocal'
    import CloseButton from 'src/components/CloseButton.vue'
    
    import { create_pdf } from 'src/scripts/pdf'

    const inventorySt = useInventory()
    const itemsLocalSt = itemsLocal()

    const archetypeColumns = [
        { name: 'property',     align: "center", label: "Property Name", field: "property", sortable: true },
        { name: 'propertyType', align: "center", label: "Property Type", field: "propertyType", sortable: true },
        { name: 'defaultValue', align: "center", label: "Default Value", field: "defaultValue", sortable: true },
        { name: 'delete', field: "delete", headerStyle: 'width: 3%'}
    ]

    export default defineComponent({
        name: 'Items',
        components: { CloseButton },
        setup () {
            return {
                inventorySt,
                itemsSt: itemsLocalSt,

                tab: ref(inventorySt.schemes[0].name),
                
                lend: ref(false),
                manage: ref(false),
                editArc: ref(false),
                confirmProp: ref(false),
                confirmSel: ref(false),

                deleteSelected: ref([]),
                splitterModel: ref(10),

                search: ref(""),

                archColumns: archetypeColumns,

                searchFilter(item, param) {
                    // converts item name to lowercase, removes accents (for epée), and checks to see if it contains the search parameters.
                    return item.Name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(param.toLowerCase());
                },

                filterFn (val, update, abort) {
                    update(() => {
                        const needle = val.toLocaleLowerCase()
                        options.value = stringOptions.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
                    })
                }
            }
        }
    })
</script>