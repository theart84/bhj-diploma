/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static url = '/account';

  static async list( data, callback = f => f ) {
    return await createRequest({
      data,
      url: Account.url,
      method: 'GET',
      callback: callback,
    });
  }
}
