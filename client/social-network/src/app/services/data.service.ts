import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private commentSource = new BehaviorSubject<number>(-1);
  idForComment = this.commentSource.asObservable();

  private viewSource = new BehaviorSubject<number>(-1);
  view = this.viewSource.asObservable();

  private loginSource = new BehaviorSubject<boolean>(false);
  login = this.loginSource.asObservable();

  private editSource = new BehaviorSubject<boolean>(false);
  isEdit = this.editSource.asObservable();

  private editIdSource = new BehaviorSubject<number>(-1);
  editId = this.editIdSource.asObservable();


  constructor() { }

  changePostForComment(id: number) {
    this.commentSource.next(id)
  }

  setPostForView(val: number) {
    this.viewSource.next(val);
  }

  changeLoginStatus(val: boolean) {
    this.loginSource.next(val);
  }

  updateEditStatus(val: boolean) {
    this.editSource.next(val);
  }

  setIdForEdit(val: number){
    this.editIdSource.next(val);
  }

}
