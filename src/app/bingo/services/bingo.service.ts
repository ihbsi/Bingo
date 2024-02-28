
import { Injectable, inject } from '@angular/core';
import { BingoCard } from '../interfaces/bingo';
import { Observable } from 'rxjs';
import { DocumentData, Firestore, QuerySnapshot, addDoc, collection, collectionData, doc, getDocs, query, updateDoc } from '@angular/fire/firestore';

const PATH = 'bingoData';
@Injectable({
  providedIn: 'root'
})
export class BingoService {

  private _firestore: Firestore = inject(Firestore);
  private _bingoRef = collection(this._firestore, PATH);

  constructor() { }

  getBingoCard(): Promise<QuerySnapshot<DocumentData>> {
    return getDocs(query(this._bingoRef));
  }

  addBingoCard(bingoCard: BingoCard) {
    return addDoc(this._bingoRef, bingoCard);
  }

  updateValueCard(bingoCard: BingoCard) {
    let docToUpdate = doc(this._firestore, PATH, bingoCard.idFirebase);
    return updateDoc(docToUpdate, { ...bingoCard });
  }
}
