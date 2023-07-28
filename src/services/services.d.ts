export interface UserRegisterParamsInterface {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface UserLoginParamsInterface {
  credentialId: string;
  password: string;
}

export interface UserVerifySendParamsInterface {
  otp: string;
  email: string;
}
export interface JobInterface {
  jobId: string;
  name: string;
  jobType: string;
  quantity: number;
  benefit: string;
  salaryRange: string;
  requirement: string;
  location: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
  deadline: string;
  position: {
    positionId: string;
    name: string;
  };
  skills: {
    skillId: string;
    name: string;
  }[];
}

export interface JobListConfig {
  index?: number | string;
  size?: number | string;
  name?: string;
  type?: string;
  location?: string;
  posName?: string;
}

export interface JobReccerListConfig {
  page?: number | string;
  size?: number | string;
  name?: string;
  type?: string;
  location?: string;
  posName?: string;
}

export interface EventInterface {
  id: string;
  title: string;
  name: string;
  description: string;
  img: string | null;
  author: string;
  linkContacts: {
    Instagram: string;
    LinkedIn: string;
    Twitter: string;
    Facebook: string;
    Gitlab: string;
  };
  startAt: string;
  deadline: string;
  time: string;
  location: string;
}
export interface AdminJobListConfig {
  page?: number | string;
  size?: number | string; 
}
export interface AdminJobInterface {
idJob: string;
name: string;
date : string;
quantity: number;
member: string;
}

export interface AdminJobPassInterface {
name: string;
date : string;
phone: number;
score: string;
}

export interface AdminJobPassListConfig {
page?: number | string;
size?: number | string; 
id?: number | string; 
}

export interface AcountInterface {
name: string;
date : string;
phone: number;
email: string;
id: string;  
}

export interface AcountConfig {
page?: number | string;
size?: number | string; 
searchText?: string;
searchBy?: string;  
}

export interface Pagable {
  page?: number | string;
  limit?: number | string;
}

export interface GetUsersInterviewsParams extends Pagable {}
