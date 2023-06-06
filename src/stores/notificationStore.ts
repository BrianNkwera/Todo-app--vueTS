import { defineStore } from "pinia";
import type { NotificationType } from "../types/notificationInterface";

export default defineStore("notification", {
  state: () => ({
    notification: {
      title: "",
      details: "",
      isSuccess: false,
    } as NotificationType,
  }),

  actions: {
    showNotification(notification: NotificationType) {
      this.notification.title = notification.title;
      this.notification.details = notification?.details || "";
      this.notification.isSuccess = notification.isSuccess;

      const toastLiveExample = document.getElementById("notificationToast");

      //@ts-ignore
      const toast = new bootstrap.Toast(toastLiveExample);

      toast.show();
    },
    closeNotification() {
      this.notification.title = "";
      this.notification.details = "";
      this.notification.isSuccess = false;
      this.notification.show = false;
    },
  },
});
