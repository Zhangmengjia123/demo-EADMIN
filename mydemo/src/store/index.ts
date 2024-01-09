import { defineStore } from 'pinia'
import { Names } from './store_name'
type User = {
  name: string
  age: number
}

const Login = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'wjw',
        age: 22
      })
    }, 2000)
  })
}
export const userInfoStore = defineStore(Names.TEST, {
  state: () => {
    return {
      list: {
				data:[]
			},
      name: 'id',
      age: 10
    }
  },
  getters: {
		getname():string{
     return `这是getter${this.age}`
		}
	},

  actions: {
    async setUser() {
      const result = await Login()
      this.name = result.name
      this.age = result.age
    }
  },
  persist:true
})
