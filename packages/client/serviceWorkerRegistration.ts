export async function serviceWorkerRegistration() {
  window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(
          'serviceWorker.ts'
        )
        console.log('Service worker registered:', registration)

        if (!('Notification' in window)) {
          console.error('This browser does not support desktop notifications')
          return
        }

        const permission = await Notification.requestPermission()
        console.log('Permission status:', permission)
      } catch (error) {
        console.log('Service worker registration error:', error)
      }
    }
  })
}
