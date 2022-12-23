import { Timestamp } from "firebase/firestore"

export interface EntryType {
  id:string,
  title:string,
  content:string,
  createdAt:Timestamp,
}

export interface DiaryType {
  id:string,
  title:string,
  type:string,
  entries:EntryType[],
  uid:string,
  displayName:string,
  createdAt:Timestamp,
}

export interface NotificationType {

  id:string,
  content:string,
  createdAt:Timestamp,
  displayName:string

}