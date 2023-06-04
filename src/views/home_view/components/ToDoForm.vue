<template>
    <div @click.capture="onModalBlur" class="modal fade" id="createTodoModal" tabindex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content border-0 bg-inherit">
                <div class="modal-body p-0">
                    <form @submit.prevent id="toDoForm" class="mt-3 w-100 shadow bg-white"
                        @submit="toDoItem === null ? createNewTodo : editSelectedTodo">
                        <div class="to-do-header text-center bg-success text-white py-3">
                            <button @click="closeModal" type="button" class="bg-inherit border-0 float-end text-white me-4">
                                X
                            </button>
                        </div>
                        <div class="p-md-5 p-3">
                            <div class="mb-3">
                                <label :class="[
                                    (v$.title.$error || editingErrors.title) && 'text-danger',
                                    'form-label fs-6',
                                ]">
                                    CATEGORY
                                </label>
                                <input v-if="toDoItem !== null" v-model="editedTodo.title" :class="[
                                    editingErrors.title && 'border-danger',
                                    'form-control no-outline',
                                ]" />
                                <input v-else v-model="newTodo.title" placeholder="Category" :class="[
                                    v$.title.$error && 'border-danger',
                                    'form-control no-outline',
                                ]" />
                                <div class="mt-2 text-danger fs-6" v-if="v$.title.$error || editingErrors.title">
                                    <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
                                    {{ v$?.title?.$errors[0]?.$message || editingErrors.title }}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label :class="[
                                    (v$?.description?.$error || editingErrors.description) && 'text-danger',
                                    'form-label fs-6',
                                ]">description</label>
                                <input v-if="toDoItem !== null" v-model="editedTodo.description" :class="[
                                    editingErrors.description && 'border-danger',
                                    'form-control no-outline',
                                ]" />
                                <input v-else v-model="newTodo.description" placeholder="Description" :class="[
                                    v$?.description?.$error && 'border-danger',
                                    'form-control no-outline',
                                ]" />
                                <div class="mt-2 text-danger fs-6"
                                    v-if="v$.description.$error || editingErrors.description">
                                    <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
                                    {{ v$?.description?.$errors[0]?.$message || editingErrors.description }}
                                </div>
                            </div>
                            <button v-if="toDoItem === null" :disabled="loading" type="button" @click="createNewTodo"
                                class="zoom btn bg-success text-white w-100 mt-3">
                                <div v-if="loading" class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <span v-else>CREATE</span>
                            </button>

                            <button v-else :disabled="loading" type="button" @click="editSelectedTodo"
                                class="zoom btn bg-success text-white w-100 mt-3">
                                <div v-if="loading" class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <span v-else>EDIT</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { EditToDoType, TodoType } from "../../../types/todoInterface";

//stores
import useTodoStore from "../../../stores/todoStore";
// import useNotificationStore from "../../../stores/notificationStore";

const { addToDo, updateTodo } = useTodoStore();
// const { showNotification } = useNotificationStore();

interface ToDoFormProps {
    isCreateTodoForm: boolean;
    toDoItem: TodoType | null;
}

const props = defineProps<ToDoFormProps>();

//emits
const emit = defineEmits(["onCreateTodo", "onCloseModal"]);

//data
const loading = ref(false);
const editedTodo = ref<EditToDoType>({
    id: "",
    title: "",
    description: "",
    created: "",
    completed: false,
    lastUpdated: "",

});

const editingErrors = ref({
    title: "",
    description: "",
});

const newTodo = ref<TodoType>({
    id: "",
    title: "",
    description: "",
    created: "",
    completed: false,
    lastUpdated: "",

});

//hooks
onMounted(() => {
    editedTodo.value.title = props.toDoItem?.title || "";
    editedTodo.value.description = props.toDoItem?.description || "";
    editedTodo.value.completed = props.toDoItem?.completed || false;
    editedTodo.value.created = props.toDoItem?.created || "";
    editedTodo.value.lastUpdated = props.toDoItem?.lastUpdated || "";

});

//validation
const createTodoRules = {
    title: { required: helpers.withMessage("Title is required", required) },
    description: {
        required: helpers.withMessage("Description is required", required),
    },
};

const v$ = useVuelidate(createTodoRules, newTodo);

//watch for editing errors errors
watch(
    [() => editedTodo.value.title, () => editedTodo.value.description],
    ([newTitle, newDescripiton]) => {
        if (newTitle === "") editingErrors.value.title = "Title is required"
        if (newTitle !== "") editingErrors.value.title = ""
        if (newDescripiton === "") editingErrors.value.title = "Description is required";
        if (newDescripiton !== "") editingErrors.value.title = ""
    }
);

//methods

const onModalBlur = (event: FocusEvent) => {

    const targetElement = event.target as Element | null;

    //exist when someone clicks inside the modal
    if (targetElement?.closest(".modal-body")) return;

    closeModal();
};

const closeModal = () => {
    v$.value.$reset();
    emit("onCloseModal");

    const modal = document.getElementById("createCategoryModal");
    if (!modal) return;
    //@ts-ignore
    const categoryModal = bootstrap.Modal.getInstance(modal);
    categoryModal?.hide();
};

const createNewTodo = async () => {
    try {
        //validate form using vuelidate
        v$.value.$validate();

        if (!v$.value.$error) {
            loading.value = true;

            await addToDo(newTodo.value);

            //show notification
            //             showNotification({
            //                 isSuccess: true,
            //                 header: "Success",
            //                 text: "Created New Todo",
            //             };
            // );

            emit("onCreateTodo");

            //close model
            const modal = document.getElementById("createTodoModal");
            //@ts-ignore
            const createCategoryModal = bootstrap.Modal.getInstance(modal);
            createCategoryModal?.hide();

            //reset values
            newTodo.value.title = "";
            newTodo.value.description = "";
            newTodo.value.completed = false;
            newTodo.value.created = "";
            newTodo.value.lastUpdated = "";

            v$.value.$reset();
        }
    } catch (error: any) {
        error.title = "";
        // showNotification({
        //     isSuccess: false,
        //     header: "Failed",
        //     text: error.toString(),
        // });
        console.log(error)
    }
    finally {
        loading.value = false
    }
};

const editSelectedTodo = async () => {
    if (props.toDoItem === null) return;

    try {
        if (editingErrors.value.title === "" && editingErrors.value.description === "") {
            loading.value = true;

            await updateTodo(editedTodo.value);

            //show notification
            // showNotification({
            //     isSuccess: true,
            //     header: "Success",
            //     text: "Successfully updated todo item",
            // });



            emit("onCreateTodo");

            //close model
            closeModal();
        }
    } catch (error: any) {
        error.title = "";
        console.log(error);
        // showNotification({
        //     isSuccess: false,
        //     header: "Editing failed",
        //     text: error.toString(),
        // });
        loading.value = false;
    }
    finally {
        //stop loading
        loading.value = false;
    }
};
</script>
  
<style scoped>
#toDoForm,
.to-do-header {
    border-radius: 50px 50px 0px 0px;
}

.modal-body {
    max-width: 480px;
    /* margin-left: auto;
    margin-right: auto; */
}
</style>
  