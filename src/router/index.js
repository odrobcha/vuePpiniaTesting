import {createRouter, createWebHashHistory} from 'vue-router';

import HomeView from '../views/HomeView.vue';
import JobResultsView from '../views/JobResultsView.vue';
import JobView from '../views/JobView.vue';
import TeamsView from '../views/TeamsView.vue';

const routes = [
    {
        path: '/',
        name : 'Home',
        component: HomeView,
    },
    {
        path: '/teams',
        name : 'Teams',
        component: TeamsView,
    },
    {
        path: '/jobs/results',
        name: 'JobResults',
        component: JobResultsView
    },
    {
        path: '/jobs/results/:id',
        name: "JodDetail",
        component: JobView,
    }
];

const router = createRouter(
  {
      history: createWebHashHistory(),
      routes,
      scrollBehavior(/*to, from, savedPosition*/){
          // console.log("Router", to);
          // console.log("Router",  from,);
          // console.log("Router",  savedPosition);

          return {
              top: 0,
              left: 0,
              behavior: "smooth"
          }
      }
  }
);
export default router
