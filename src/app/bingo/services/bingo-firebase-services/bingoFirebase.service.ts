
import { Injectable, inject } from '@angular/core';
import { BingoFirebase } from '../../interfaces/bingo';
import { DocumentData, Firestore, QuerySnapshot, addDoc, collection, doc, getDocs, query, updateDoc } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

const PATH = environment.pathDataBingoCollectFirebase;
@Injectable({
  providedIn: 'root'
})
export class BingoFirebaseService {

  private _firestore: Firestore = inject(Firestore);
  private _bingoRef = collection(this._firestore, PATH);

  constructor() { }

  getBingoFirebase(): Promise<QuerySnapshot<DocumentData>> {
    return getDocs(query(this._bingoRef));
  }

  addBingoCardFirebase(bingoCard: BingoFirebase) {
    return addDoc(this._bingoRef, bingoCard);
  }

  updateCardFirebase(bingoCard: BingoFirebase) {
    let docToUpdate = doc(this._firestore, PATH, bingoCard.idFirebase);
    return updateDoc(docToUpdate, { ...bingoCard });
  }
}
