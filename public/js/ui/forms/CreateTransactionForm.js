/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.element = element;
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), (data) => {
      const selectElement = this.element.querySelector('select');
      selectElement.innerHTML = '';
      selectElement.insertAdjacentHTML('afterbegin', data.data.map((item) => `<option value="${item.id}">${item.name}</option>`).join(' '));
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  async onSubmit(options) {
    const typeForm = this.element.closest('.modal').dataset.modalId;
    await Transaction.create(options, App.update.bind(App));
    this.element.reset()
    App.modals[typeForm].close();
  }
}
