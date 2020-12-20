/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Элемент должен быть передан!');
    }
    this.modalWindow = element;
    this.registerEvents()
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    this.loginButton
    this.closeElements = [...this.modalWindow.querySelectorAll('button[data-dismiss="modal"]')];
    this.closeElements.forEach((button) => button.addEventListener('click', this.onClose));
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
    e.preventDefault();
    const currentTarget = e.target;
    const parent = currentTarget.closest('.modal');
    const currentModal = App.getModal(parent.dataset.modalId);
    currentModal.close();
  }

  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    this.closeElements.forEach((button) => button.removeEventListener('click', this.onClose));
  }

  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.modalWindow.style.display = 'block';
  }

  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    this.modalWindow.style.display = 'none';
  }
}
