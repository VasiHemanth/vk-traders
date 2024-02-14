import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

import React from "react";

export default function CustomAlert(props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={props.triggerClassName}>
        {props.component}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {props.action && <AlertDialogAction>Continue</AlertDialogAction>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
