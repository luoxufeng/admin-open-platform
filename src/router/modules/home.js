import Home from '@/views/Home.vue';
import Layout from '@/views/layout/Index.vue';

export default [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    meta: {
      title: '首页6',
      icon: 'home'
    },
    noCollapse: true,
    children: [
      //首页
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页5',
          icon: 'home'
        }
      }
    ]
  }
];
