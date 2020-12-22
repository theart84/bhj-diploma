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
  constructor( element ) {
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
    const selectElements = [...document.querySelectorAll('select')];
    selectElements.forEach((select) => {
      const optionElement = [...select.querySelectorAll('option')];
      optionElement.forEach((option) => option.remove());
      select.insertAdjacentHTML('afterbegin', data.data.map((item) => `<option value="${item.id}">${item.name}</option>`).join(' '));
    });
  })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  async onSubmit( options ) {
    const typeForm = this.element.closest('.modal').dataset.modalId;
    const account_id = this.element.querySelector('select').value;
    await Transaction.create({ ...options, account_id }, App.update.bind(App));
    const currentForm = App.getForm(typeForm);
    const currentModal = App.getModal(typeForm);
    currentForm.element.reset();
    currentModal.close();
    // await App.getPage('transactions').update();
    // document.querySelector(`li[data-account-id="${account_id}"]`).classList.add('active');

  }
}
