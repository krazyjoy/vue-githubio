<template>
    <div class="course-form-container m-3">
        <table class="table table-bordered course-form">
            <tbody>
                <tr>
                    <th class="align-items-center">學程名稱</th>
                    <td class="input-group">
                        <input type="text" v-model="course.name" class="form-control" aria="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                </tr>
                <tr>
                    <th class="align-items-center">學程編號</th>
                    <td class="input-group">
                        <input type="text" v-model="course.id" class="form-control" aria="Default" aria-describedby="inputGroup-sizing-default">
                    </td>
                </tr>
                <tr>
                    <th class="align-items-center">學習目錄</th>
                    <td class="input-group">
                        <div class="dropdown">
                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{course.catalog ? course.catalog: '選擇課程'}}                                 
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#" v-for="catalog in courses" :key="catalog"  @click="selectCourse(catalog)">{{catalog}}</a>
                            </div>
                            
                        </div>
                    </td>
                </tr>
                <tr>
                    <th class="align-items-center">必選修</th>
                    <td>
                        <div class="dropdown">
                            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{course.mandatoryOrNot ? course.mandatoryOrNot: '必修或者選修'}}
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#" v-for="courseType in courseTypes" :key="courseType" @click="defineCourseType(courseType)">{{courseType}}</a>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th class="align-items-center">課程縮圖</th>
                    <td>
                        <div class="ps-2">
                            <button class="btn btn-primary form-item-button">上傳</button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th class="align-items-center">包含課程/問卷</th>
                    <td>
                        <div class="ps-2">
                            <button class="btn btn-primary form-item-button">選擇</button>
                        </div>
                    </td>
                </tr>
                <tr> 
                    <th class="align-items-center">學程目標</th>
                    <td>
                        <input type="text" v-model="course.goal" class="form-control longer-input" aria="Default" aria-describedby="inputGroup-sizing-default">
                    </td> 
                </tr>
                <tr> 
                    <th class="align-items-center">學程大綱</th>
                    <td>
                        <input type="text" v-model="course.outline" class="form-control longer-input" aria="Default" aria-describedby="inputGroup-sizing-default">
                    </td> 
                </tr>
            </tbody>
        </table>
        <div class="button-set">
            <button class="btn btn-secondary" @click="$emit('cancel')">
                取消
            </button>
            <span style="width: 50px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <button class="btn btn-primary" @click="save">
                確認
            </button>
        </div>
    </div>
        
</template>

<script setup>
import { ref } from 'vue'
import {defineProps, defineEmits} from 'vue';

const courses = ref(['1-1 銷售基本概念', '2-1 銷售技巧', '2-2 消費者心理']);
const courseTypes = ref(['必修', '選修']);


const props = defineProps({
    course: Object
});

const selectCourse = (course) => {
    props.course.catalog = course
};

const defineCourseType = (isMandatory) => {
    props.course.mandatoryOrNot = isMandatory;
};


const emits = defineEmits('save', 'cancel');


const save = () =>{
    emits('save', props.course);
}


</script>

<style scoped>


.course-form tbody tr th{
    width: 10vw;
}

.course-form tbody tr th{
    background-color: #90caf9;
}

.course-form tbody tr td{
    padding: 10px;
    width: 30vw;
}
.course-form tbody tr td input{
    min-height: 8vh;
}

.form-item-button{
    border: solid 1px #023e8a;
    padding: 5px 16px;
    border-radius: 6px;

}

.longer-input{
    min-height: 120px;
}



</style>