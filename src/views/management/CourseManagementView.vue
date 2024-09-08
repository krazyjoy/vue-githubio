<template>
    <div class="p-5 w-100">
        <p class="management-title">課程管理</p>
        <div class="d-flex gap-4 py-3">
            <button class="btn btn-primary" @click="startCreateCourseMode">新增課程</button>
            <button class="btn btn-primary">上傳課程</button>
        </div>

        <CourseMangementForm v-if="clickedCreateCourse" @save="saveCourseToList" @cancel="cancelSave" :course=newCourse></CourseMangementForm>
            

        
        <div v-if="!clickedCreateCourse">
            <table class="table table-bordered course-table">
                <thead>
                    <tr>
                        <th class="bg-primary text-white">#</th>
                        <th class="bg-primary text-white">學程名稱</th>
                        <th class="bg-primary text-white">學程編號</th>
                        <th class="bg-primary text-white">學習目錄</th>
                        <th class="bg-primary text-white">必選修</th>
                        <th class="bg-primary text-white">學程目標</th>
                        <th class="bg-primary text-white">學程大綱</th>
                        <th class="bg-primary text-white">最後更新時間</th>
                        <th class="bg-primary text-white">更新人員</th>
                        <th class="bg-primary text-white">編輯</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- <tr>
                        <td>1</td>
                        <td>課程</td>
                        <td>序號</td>
                        <td>目錄</td>
                        <td>必修</td>
                        <td>沒啥目標</td>
                        <td>沒啥大綱</td>
                        <td>上周</td>
                        <td>aaa</td>
                        <td>
                            <div class="edit-container">
                                <font-awesome-icon :icon="['fas', 'gear']" class="cogs-icon"@click="edit()"/>
                                <div class="editDropdownMenu" v-if="isEditing">
                                    <ul class="editDropdownList">
                                        <li><a class="editDropdownItem" href="#">編輯</a></li>
                                        <li><a class="editDropdownItem" href="#" @click="closeEdit">關閉</a></li>
                                    </ul>
                                </div>
                            </div>
                        </td>
                        
                    </tr> -->
                    <tr v-for="(course, index) in courseList" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ course.name }}</td>
                        <td>{{ course.id }}</td>
                        <td>{{ course.catalog }}</td>
                        <td>{{ course.mandatoryOrNot }}</td>
                        <td>{{ course.goal }}</td>
                        <td>{{ course.outline }}</td>
                        <td>{{ course.lastEdit }}</td>
                        <td>{{ course.editPerson }}</td>
                        <td>
                            <div class="edit-container">
                                <font-awesome-icon :icon="['fas', 'gear']" class="cogs-icon"@click="edit(index)"/>
                                <div class="editDropdownMenu" v-if="courseList[index].isEditing">
                                    <span class="editDropdownItem" @click=openEdit(index)>編輯2</span>
                                    <span class="editDropdownItem" @click=closeEdit(index)>關閉2</span>
                                    <!-- <ul class="editDropdownList">
                                        <li><a class="editDropdownItem" href="#" @click="openEdit(index)">編輯</a></li>
                                        <li><a class="editDropdownItem" href="#" @click="closeEdit(index)">關閉</a></li>
                                    </ul> -->
                                </div>
                            </div>
                        </td>
                        
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
   
   
</template>
<script setup>
import { ref } from 'vue'
import CourseMangementForm from '@/components/management/CourseMangementForm.vue';

const courseList = ref([])
const clickedCreateCourse = ref(false);
const selectedCourse = ref(null);


const startCreateCourseMode = () =>{
    clickedCreateCourse.value = true;
};
const newCourse = ref({ 
    name: '',
    id: '',
    catalog: '',
    mandatoryOrNot: '',
    goal: '',
    outline: '',
    lastEdit: '',
    editPerson: '',
    isEditing: false,});


const resetNewCourse = () => {
    newCourse.value = {
        name: '',
        id: '',
        catalog: '',
        mandatoryOrNot: '',
        goal: '',
        outline: '',
        lastEdit: '',
        editPerson: '',
        isEditing: false,
    }
};


const cancelSave = () => {
    resetNewCourse();
}




const saveCourseToList = (course) =>{

    const index = courseList.value.findIndex(course_itr =>course_itr.name === course.name)
    const orderedCourse =  {
        name: course.name,
        id: course.id,
        catalog: course.catalog,
        mandatoryOrNot: course.mandatoryOrNot,
        goal: course.goal,
        outline: course.outline,
        lastEdit: '',
        editPerson: '',
        isEditing: false,
    }
    console.log("index: ",index)
    if(index!==-1){
        courseList.value[index] = orderedCourse;
    }
    else{
        courseList.value.push(orderedCourse);
        console.log(courseList.value);
    }
    
    resetNewCourse();
    
    clickedCreateCourse.value = false; // close form
};



const edit = (index) => {
    courseList.value[index].isEditing = true;
}
const openEdit = (index) => {
    newCourse.value = courseList.value[index];
    clickedCreateCourse.value = true;
}
const closeEdit = (index) =>{
    courseList.value[index].isEditing = false;
    console.log("close mode: ", courseList.value[index].isEditing)
}
</script>

<style scoped>
.management-title {
    font-weight: 600;
    font-size: large;
}
.course-form-container{
    display: flex;
    width: 40vw;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

/* table 2 */

.course-table{
    padding: 1px;
    max-width: 100vw;
}
.course-table thead th{
    min-width: 5vw;
    max-width: 10vw;
};

.course-table thead th:first-child {
    border-top-left-radius: 0.5rem;
}

.course-table thead th:last-child {
    border-top-right-radius: 0.5rem; 
    min-width: 10vw;
}
.button-set{
    display: flex;
    margin-top: 20px;
}
.edit-container{
    position: relative;
    margin: 8px;
}
.editDropdownMenu{
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    z-index: 1;
    position:absolute;
    left: 10px;
}



.editDropdownItem{
    border: solid 1px #000;;
    padding: 4px 6px;
}
.editDropdownItem:hover{
    background-color: #758694;;
    
}
/* .editDropdownItem:not(:last-child){
    border-bottom: none;
} */

.editDropdownList li:hover{
    background: rgba(0, 0, 0, 0.3);
}

</style>