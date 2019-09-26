import React from "react";
import "./App.css";
import {
  IonButton,
  IonItem,
  IonLabel,
  IonText,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonIcon
} from "@ionic/react";
import { document, trash } from "ionicons/icons";
export default function ThingListItem({ doEdit, doDelete, doc }) {
  let data = doc.data();

  return (
    <IonItemSliding>
      <IonItem>
        <IonLabel class="ion-text-wrap">
          <IonText className="thing-title">
            <div>{data.name}</div>
          </IonText>
          <IonText className="thing-sub-title">
            <div>{new Date(data.createdOn) + ""}</div>
          </IonText>
          <IonText className="thing-id">{doc.id}</IonText>
        </IonLabel>
        <div></div>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption
          onClick={() => {
            doEdit(doc.id);
          }}
        >
          <IonIcon slot="icon-only" icon={document}></IonIcon>
        </IonItemOption>
        <IonItemOption color="danger" onClick={() => doDelete(doc.id)}>
          <IonIcon slot="icon-only" icon={trash}></IonIcon>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
}
