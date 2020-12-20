/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const showSidebarButton = document.querySelector('.visible-xs');
    showSidebarButton.addEventListener('touchend', () => {
      document.body.classList.toggle('sidebar-open');
      document.body.classList.toggle('sidebar-collapse');
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регистрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const sideBarMenuElement = document.querySelector('.sidebar-menu');
    sideBarMenuElement.addEventListener('click', (e) => {
      const currentElement = e.target;
      if (currentElement.textContent === 'Вход') {
        const modalWindow = App.getModal('login');
        modalWindow.open();
      }
      if (currentElement.textContent === 'Регистрация') {
        const modalWindow = App.getModal('register');
        modalWindow.open();
      }
      if (currentElement.textContent === 'Выйти') {
        User.logout(User.current(), User.unsetCurrent);
      }
    })
  }
}
