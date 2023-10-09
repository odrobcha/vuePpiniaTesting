import {defineStore} from 'pinia';
import getJobs from '../api/getJobs';
import {useUserStore} from './user';

export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS";
export const UNIQUE_JOB_TYPES = "UNIQUE_JOB_TYPES";
export const FILTERED_JOBS = "FILTERED_JOBS";
export const INCLUDE_JOB_BY_ORGANIZATION = "INCLUDE_JOB_BY_ORGANIZATION";
export const INCLUDE_JOB_BY_JOB_TYPE = "INCLUDE_JOB_BY_JOB_TYPE";

import type {Job} from "@/api/types";
export interface JobsState {
    jobs: Job[]
}

export const useJobsStore = defineStore('jobs', {
    state: ():jobs=>({
        jobs: []
    }),
    getters: {
        [UNIQUE_ORGANIZATIONS](state){   //state is provided automatically
            const uniqueOrganizations = new Set<string>();
            state.jobs.forEach(job =>{
                uniqueOrganizations.add(job.organization);
            });
            return uniqueOrganizations;
        },
        [UNIQUE_JOB_TYPES](state){
            const uniqueJobType = new Set<string>();
            state.jobs.forEach(job=>{
                uniqueJobType.add(job.jobType)
            });
            return uniqueJobType
        },

        [INCLUDE_JOB_BY_ORGANIZATION]: ()=> (job:Job) => {
            const userStore = useUserStore();
            if(userStore.selectedOrganizations.length === 0){
                return true
            }
            return userStore.selectedOrganizations.includes(job.organization);
        },
        [INCLUDE_JOB_BY_JOB_TYPE] : () => (job:Job) => {
            const userStore = useUserStore();
            if(userStore.selectedJobTypes.length === 0) return true;
            return userStore.selectedJobTypes.includes(job.jobType);
        },

        [FILTERED_JOBS](state):Job[]{
            return state.jobs
              .filter((job:Job) =>  {
                 return this.INCLUDE_JOB_BY_ORGANIZATION(job);
              }
                  )
              .filter(job => this.INCLUDE_JOB_BY_JOB_TYPE(job));
        }
    },
   actions: {
        async [FETCH_JOBS](){    //defined a dynamic method name that is equal  to value of constant FETCH_JOBS
           const jobs = await getJobs();
           this.jobs = jobs;
        }
   }
});
