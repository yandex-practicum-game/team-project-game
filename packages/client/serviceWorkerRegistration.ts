export async function serviceWorkerRegistration() {
  window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(
          'serviceWorker.ts'
        )
        console.log('Сервисный работник зарегистрирован:', registration)

        if (!('Notification' in window)) {
          console.error(
            'Этот браузер не поддерживает уведомления на рабочем столе'
          )
          return
        }

        const permission = await Notification.requestPermission()
        console.log('Статус разрешения:', permission)
      } catch (error) {
        console.log('Ошибка регистрации сервис-воркера:', error)
      }
    }
  })
}
