self.addEventListener("install", () => {
  console.log("✅ Service Worker Installed");
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("http://localhost:5173")
  );
});