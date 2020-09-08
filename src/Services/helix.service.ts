import request from 'request'

export default class HelixService {

   HelixUrl: string

   constructor(helixUrl: string){
      this.HelixUrl = helixUrl
   }

   monitorEntity = (entity: string, time: number): void => {

      request(this.HelixUrl + entity, (error, response, body) => {
         console.log('body:', body);
      })

      setTimeout(() => this.monitorEntity(entity,time) ,time) 
   }
}