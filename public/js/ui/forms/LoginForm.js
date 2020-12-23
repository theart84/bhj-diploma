/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  async onSubmit(options) {
    const response = await User.login(options, User.setCurrent);
    this.element.reset();
    App.modals.login.close();
    response.success
        ? App.setState('user-logged')
        : App.setState('init');
  }
}
