import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  writeBatch,
  updateDoc,
  deleteDoc,
  Timestamp,
  query,
  orderBy,
  limit
} from 'firebase/firestore'
import { uuidv4 } from "@firebase/util";
import { DiaryType, EntryType,NotificationType } from "./types";

const firebaseConfig = {
  apiKey: "AIzaSyB-XjlTqAheJHCd1iAhA9p_EPGLlQobTxY",
  authDomain: "diary-e0e9c.firebaseapp.com",
  projectId: "diary-e0e9c",
  storageBucket: "diary-e0e9c.appspot.com",
  messagingSenderId: "23035722176",
  appId: "1:23035722176:web:01a073ebf65d44a948b025",
  measurementId: "G-1D9SMCHQVR"
};


const firebaseApp = initializeApp(firebaseConfig);

// 使用google provider
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
})

// 可以实现跟踪
export const auth = getAuth();
// 通过google的两种登录方式（弹窗或者重定向）
export const signInWithGooglePopup = () => signInWithPopup(auth,provider)

// 创建数据库实例
export const db = getFirestore()

type AdditionalInformation = {
  firstname:string,
  lastname:string,
}

// 创建collection ==> for users
export const createUserDocumentFromAuth = async (
  userAuth:User,
  additionalInformation = {} as AdditionalInformation) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const {firstname,lastname,} = additionalInformation;
    const createdAt = Timestamp.now();
    const nid = uuidv4();
    const content = "joined the party";

    try {
      await setDoc(userDocRef, {
        firstName:firstname,
        lastName:lastname,
        email,
        createdAt,
        ...additionalInformation,
      });

      await setDoc(doc(db,"notifications", nid),{
        id:nid,
        content,
        createdAt,
        displayName: lastname +" "+ firstname,
      });
    } catch (error) {
      console.log('error creating the user', error);
    }

  }

  return userSnapshot;
};

//通过id获取something
export const getDocument = async (collectionKey:string,id:string) => {

  const docRef = doc(db, collectionKey, id);
  const docSnap = await getDoc(docRef);

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // }
  return docSnap.data()
}


// 通过账号密码创建用户
export const createAuthUserWithEmailAndPassword = async (email:string,password:string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth,email,password);
}

// 账号密码登录
export const signInAuthUserWithEmailAndPassword = async (email:string,password:string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth,email,password);
}

// 退出登录
export const signOutUser = async () => await signOut(auth)

export type ObjectToAdd = {
  title: string,
}

//创建集合
export const addCollectionAndDocuments = async<T extends ObjectToAdd> (
  collectionKey:string,objectsToAdd:T[]) => {
  // 创建collection
  const collectionRef = collection(db,collectionKey)
  // 使用batch处理事务
  const batch = writeBatch(db);

  objectsToAdd.forEach(element => {
    const docRef = doc(collectionRef,element.title.toLowerCase())
    batch.set(docRef,element)
  });

  // 提交事务
  await batch.commit()
  console.log("done")
}

//get 
export const getDocumentByDiaries = async() => {
  const diaryRef = collection(db, "diaries");
  // const querySnapshot = await getDocs(collection(db, "notifications"));
  const q = query(diaryRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  // const querySnapshot = await getDocs(collection(db, "diaries"));
  // console.log("yes",querySnapshot)
  const mydata = querySnapshot.docs.map((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    return doc.data()
  });

  return mydata
  // console.log(mydata)
}

//add
export const addDocument = async(collectionKey:string,data:DiaryType) => {

  const {id,title,type,entries,uid,displayName,createdAt} = data
  
  try {
    await setDoc(doc(db, collectionKey, id),{
      id,
      title,
      type,
      entries,
      createdAt,
      uid,
      displayName,
    });

    
  }catch(error){
    console.log(error)
  }
}

// delete
export const deleteDocument = async (collectionKey:string,id:string) => {

  await deleteDoc(doc(db,collectionKey,id));
  
}

type UpdateDiaryType = {
  title:string,
  type:string,
  createdAt:Timestamp,
}

// update一个document的某些字段，更新diary
export const upDateDiaryDocument = async (id:string,data:UpdateDiaryType) => {

  const diaryRef = doc(db, "diaries", id);
  const {type,title,createdAt} = data

  // Set the "capital" field of the city 'DC'
  await updateDoc(diaryRef, {
    type,
    title,
    createdAt,
  });

}

export const upDateEntriesDocument = async (id:string,data:EntryType[]) => {

  const diaryRef = doc(db, "diaries", id);

  // Set the "capital" field of the city 'DC'
  await updateDoc(diaryRef, {
    entries:data,
  });

}

// 添加notifications
export const addNotificationsDocument = async (data:NotificationType) => {

  const {id,content,createdAt,displayName} = data
  try {
    await setDoc(doc(db,"notifications", id),{
      id,
      content,
      createdAt,
      displayName,
    });
  }catch(error){
    console.log(error)
  }
}


export const getNotificationsDocument = async() => {
  const diaryRef = collection(db, "notifications");
  // const querySnapshot = await getDocs(collection(db, "notifications"));
  const q = query(diaryRef, orderBy("createdAt", "desc"), limit(4));
  const querySnapshot = await getDocs(q);
  const mydata = querySnapshot.docs.map((doc) => {
    return doc.data()
  });
  // console.log(mydata)
  return mydata

}