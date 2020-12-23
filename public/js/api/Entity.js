/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static url = '';

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static async list(data, callback = f => f) {
    await createRequest({
      data,
      url: this.url,
      method: 'GET',
      callback: callback,
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static async create(data, callback = f => f) {
    const {id} = User.current();
    const newData = {
      ...data,
      user_id: id,
      _method: 'PUT',
    };
    await createRequest({
      data: newData,
      url: this.url,
      method: 'POST',
      callback: callback,
    });
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static async get(id = '', data, callback = f => f) {
    await createRequest({
      data,
      url: `${this.url}/${id}`,
      method: 'GET',
      callback: callback,
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static async remove(id = '', data, callback = f => f) {
    const newData = {
      ...data,
      id,
      _method: 'DELETE',
    };
    await createRequest({
      data: newData,
      url: this.url,
      method: 'POST',
      callback: callback,
    });
  }
}

