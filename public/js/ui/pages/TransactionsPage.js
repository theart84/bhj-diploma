/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Элемент должен быть передан!');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions);
      return ;
    }
    this.render();
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const contentContainer = document.querySelector('.content');
    const removeAccountButton = document.querySelector('.remove-account');
    contentContainer.addEventListener('click', (e) => {
      const currentTarget = e.target;
      if (currentTarget.classList.contains('transaction__remove')) {
        const transactionID = currentTarget.dataset.id;
        this.removeTransaction(transactionID);
      }
    });
    removeAccountButton.addEventListener('click', () => {
      this.removeAccount()
    })
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if (!this.lastOptions) {
      return;
    }
    const isConfirm = confirm('Вы действительно хотите удалить счет?');
    if (!isConfirm) {
      return;
    }
    const { account_id } = this.lastOptions
    Account.remove(account_id, User.current(), App.update.bind(App));
    this.lastOptions = null;
    this.clear()
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction(id) {
    const currentTransactionElement = document.querySelector(`button[data-id="${id}"]`).closest('.transaction');
    const titleTransaction = currentTransactionElement.querySelector('.transaction__title').innerText;
    const isConfirm = confirm(`Вы действительно хотите удалить транзакцию: ${titleTransaction}`);
    if (isConfirm) {
      currentTransactionElement.remove();
      Transaction.remove(id, User.current(), App.update.bind(App));
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    if (!options) {
      return;
    }
    this.lastOptions = options;
    Account.get(options.account_id, User.current(), this.renderTitle.bind(this));
    Transaction.list(options, this.renderTransactions.bind(this));
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTitle({data: { name: 'Название счета' } });
    this.renderTransactions({data: []});
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(data) {
    const titleElement = document.querySelector('.content-title');
    titleElement.textContent = data.data.name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {
    return new Date(date).toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    return `
    <div class="transaction ${item.type.toLowerCase() === 'income' ? 'transaction_income' : 'transaction_expense'} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>         
          <div class="transaction__date">${this.formatDate(item.created_at)}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">${item.sum}<span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">        
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>
    `;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    const transactionContainer = document.querySelector('.content');
    transactionContainer.innerHTML = '';
    const template = data.data.map((transaction) => this.getTransactionHTML(transaction)).join(' ');
    transactionContainer.insertAdjacentHTML('afterbegin', template);
  }
}
