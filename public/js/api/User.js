/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static url = '/user';

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    if (!user.success) {
      alert(user.error);
      return;
    }
    const {name, id} = user.user;
    localStorage.setItem(`user`, JSON.stringify({name, id}));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
    App.setState('init');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    const currentUser = localStorage.getItem('user');
    if (!currentUser) {
      return undefined;
    }
    return JSON.parse(currentUser);
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static async fetch(data, callback = f => f) {
    return await createRequest({
      data,
      url: User.url + '/current',
      method: 'GET',
      callback: callback,
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static async login(data, callback = f => f) {
    return await createRequest({
      data,
      url: User.url + '/login',
      method: 'POST',
      callback: callback,
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static async register(data, callback = f => f) {
    return await createRequest({
      data,
      url: User.url + '/register',
      method: 'POST',
      callback: callback,
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static async logout(data, callback = f => f) {
    return await createRequest({
      data,
      url: User.url + '/logout',
      method: 'POST',
      callback: callback,
    });
  }
}
