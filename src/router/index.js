import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/Login.vue"
import CourseManagementView from '@/views/management/CourseManagementView.vue'
import ProjectView from '@/views/projects/Projects.vue'
import HeaderView from '@/components/management/Header.vue'
import GsapView from '@/views/testGsap.vue';
import DemoView from '@/views/demo/demo.vue';
import SSOView from '@/views/django/DjangoSSO.vue'
import LangChainView from '@/views/langchain/MindMap.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/management',
      name: 'courseManagement',
      component: CourseManagementView
    },
    {
      path: '/',
      name: 'project',
      component: ProjectView,
    },
    {
      path: '/header',
      name: 'header',
      component: HeaderView
    },
    {
      path: '/testGsap',
      
      component: GsapView
    },
    {
      path: '/demo',
      name: 'demo',
      component: DemoView,
    },
    {
      path: '/sso',
      name: 'sso',
      component: SSOView,
    },
    {
      path: '/rag',
      name: "langchain",
      component: LangChainView,
    }

  ]
})

export default router
